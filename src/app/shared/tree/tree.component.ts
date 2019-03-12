import {Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {InsertionType, TreeDatabaseService} from './providers/tree-database.service';
import {ItemFlatNode, ItemNode} from './models/item-node.model';
import {Observable, of} from 'rxjs';


@Component({
  selector: 'lt-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  providers: [TreeDatabaseService]
})

export class TreeComponent implements OnChanges {
  @Input() private data: ItemNode[];
  @Input() public canEdit = true;
  @Input() public type: new (...arg: any[]) => ItemNode;

  @Output() public updateItem = new EventEmitter<ItemNode[]>();
  @Output() public deleteItem = new EventEmitter<ItemNode>();
  @Output() public createItem = new EventEmitter<ItemNode>();

  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<ItemFlatNode, ItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<ItemNode, ItemFlatNode>();

  treeControl: FlatTreeControl<ItemFlatNode>;

  treeFlattener: MatTreeFlattener<ItemNode, ItemFlatNode>;

  dataSource: MatTreeFlatDataSource<ItemNode, ItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<ItemFlatNode>(true /* multiple */);

  /* Drag and drop */
  dragNode: ItemFlatNode;
  dragNodeExpandOverWaitTimeMs = 300;
  dragNodeExpandOverNode: any;
  dragNodeExpandOverTime: number;
  dragNodeExpandOverArea: string;
  @ViewChild('emptyItem') emptyItem: ElementRef;

  saveIsDisabled = true;

  constructor(private database: TreeDatabaseService) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<ItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    database.updateEventEmitter = this.updateItem;
    database.deleteEventEmitter = this.deleteItem;

    database.dataChange.subscribe(data => {
      this.dataSource.data = [];
      this.dataSource.data = data;
    });
  }

  getLevel = (node: ItemFlatNode) => node.level;

  isExpandable = (node: ItemFlatNode) => node.expandable;

  getChildren = (node: ItemNode): Observable<ItemNode[]> => {
    return of(node.children);
  };

  hasChild = (_: number, _nodeData: ItemFlatNode) => _nodeData.expandable;

  showAsInput = (_: number, _nodeData: ItemFlatNode) => {
    return _nodeData.showAsInput;
  };

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: ItemNode, level: number): ItemFlatNode => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.text === node.text
      ? existingNode
      : new ItemFlatNode();
    flatNode.text = node.text;
    flatNode.showAsInput = node.showAsInput;
    flatNode.level = level;
    flatNode.expandable = (node.children && node.children.length > 0);
    if (node.is_completed) {
      this.checklistSelection.select(flatNode);
    }
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  /** Whether all the descendants of the node are selected */
  descendantsAllSelected(node: ItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    return descendants.every(child => this.checklistSelection.isSelected(child));
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(flatNode: ItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(flatNode);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(flatNode);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(flatNode: ItemFlatNode): void {
    this.checklistSelection.toggle(flatNode);
    const node = this.flatNodeMap.get(flatNode);
    node.is_completed = !node.is_completed;

    this.updateItem.emit(this.getChangedCheckedItems(node));
  }


  /** add item(add value-item)**/
  addItemToRoot(nodeText: string) {
    const data = new this.type();
    data.text = nodeText;
    this.database.insertItem(null, data, true);
    this.createItem.emit(data);
  }

  /** add item(add input-item) **/
  addNewItem(node: ItemFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    const data = new this.type();
    data.showAsInput = true;

    this.database.insertItem(parentNode, data, true);
    if (!!parentNode.children) {
      this.treeControl.expand(node);
    }

    this.updateItem.emit(this.getChangedCheckedItems(data));
  }

  /** add item(replace input with value)**/
  addItem(nodeText: string, node: ItemFlatNode) {
    const data = this.flatNodeMap.get(node);
    data.isNew = false;
    data.showAsInput = false;
    this.database.updateItem(data, nodeText);
    this.createItem.emit(data);
  }

  /** edit item(replace value with input)**/
  editItem(node: ItemFlatNode) {
    const data = this.flatNodeMap.get(node);
    data.showAsInput = true;
    this.database.updateItem(data, data.text);
  }

  /** remove item **/
  removeItem(node: ItemFlatNode) {
    const data = this.flatNodeMap.get(node);
    const parent = this.database.getParentFromNodes(data);
    this.database.deleteItem(data);
    this.deleteItem.emit(data);

    if (parent.children && parent.children.length > 0) {
      this.updateItem.emit(this.getChangedCheckedItems(parent.children[0]));
    }

  }

  handleDragStart(event, node: ItemFlatNode) {
    // Required by Firefox (https://stackoverflow.com/questions/19055264/why-doesnt-html5-drag-and-drop-work-in-firefox)
    event.dataTransfer.setData('foo', 'bar');
    event.dataTransfer.setDragImage(this.emptyItem.nativeElement, 0, 0);
    this.dragNode = node;
    this.treeControl.collapse(node);
  }

  handleDragOver(event, node) {
    event.preventDefault();

    // Handle node expand
    if (node === this.dragNodeExpandOverNode) {
      if (this.dragNode !== node && !this.treeControl.isExpanded(node)) {
        if ((new Date().getTime() - this.dragNodeExpandOverTime) > this.dragNodeExpandOverWaitTimeMs) {
          this.treeControl.expand(node);
        }
      }
    } else {
      this.dragNodeExpandOverNode = node;
      this.dragNodeExpandOverTime = new Date().getTime();
    }

    // Handle drag area
    const percentageY = event.offsetY / event.target.clientHeight;
    if (percentageY < 0.25) {
      this.dragNodeExpandOverArea = 'above';
    } else if (percentageY > 0.75) {
      this.dragNodeExpandOverArea = 'below';
    } else {
      this.dragNodeExpandOverArea = 'center';
    }
  }

  handleDrop(event, node: ItemFlatNode) {
    event.preventDefault();
    if (node !== this.dragNode) {
      const dragNode = this.flatNodeMap.get(this.dragNode);
      const dragNodeParent = this.database.getParentFromNodes(dragNode);
      const {order: oldOrder, parentId: oldParentId} = dragNode;
      let newItem: ItemNode;

      if (this.dragNodeExpandOverArea === 'above') {
        newItem = this.database.insertItemNear(this.flatNodeMap.get(node), dragNode, InsertionType.ABOVE);
      } else if (this.dragNodeExpandOverArea === 'below') {
        newItem = this.database.insertItemNear(this.flatNodeMap.get(node), dragNode, InsertionType.BELOW);
      } else {
        newItem = this.database.copyPasteItem(dragNode, this.flatNodeMap.get(node));
      }

      if (oldOrder !== newItem.order && oldParentId !== newItem.parentId) {
        this.updateItem.emit([newItem]);
        this.treeControl.expandDescendants(this.nestedNodeMap.get(newItem));
      }

      this.updateItem.emit(this.getChangedCheckedItems(dragNodeParent.children[0]));
    }
    this.dragNode = null;
    this.dragNodeExpandOverNode = null;
    this.dragNodeExpandOverTime = 0;
  }

  handleDragEnd(event) {
    this.dragNode = null;
    this.dragNodeExpandOverNode = null;
    this.dragNodeExpandOverTime = 0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue) {
      this.database.initialize(changes.data.currentValue);
    }

    if (changes.type && changes.type.currentValue) {
      this.database.type = changes.type.currentValue;
    }
  }

  getChangedCheckedItems(startNode: ItemNode, checkChildren: boolean = true): ItemNode[] {
    const changedItems: ItemNode[] = [];
    const nodeIsCompleted: boolean = startNode.is_completed;
    const startFlatNode: ItemFlatNode = this.nestedNodeMap.get(startNode);
    const flatDescendants: ItemFlatNode[] = this.treeControl.getDescendants(startFlatNode);
    const descendants: ItemNode[] = flatDescendants.map((descendant: ItemFlatNode) => this.flatNodeMap.get(descendant));

    // check all children and save changes
    if (descendants.length > 0 && checkChildren) {
      descendants.forEach((descendant: ItemNode) => {
        if (descendant.is_completed !== nodeIsCompleted) {
          descendant.is_completed = nodeIsCompleted;
          changedItems.push(descendant);
        }
      });
      nodeIsCompleted ? this.checklistSelection.select(...flatDescendants) : this.checklistSelection.deselect(...flatDescendants);
    }

    // check current node and save changes
    if (descendants.length > 0) {
      const allChildrenChecked = this.descendantsAllSelected(startFlatNode);
      if (allChildrenChecked !== startNode.is_completed) {
        startNode.is_completed = allChildrenChecked;
        allChildrenChecked ? this.checklistSelection.select(startFlatNode) : this.checklistSelection.deselect(startFlatNode);
      }
    }

    // check parent
    const parentNode = this.database.getParentFromNodes(startNode);
    if (parentNode) {
      changedItems.push(...this.getChangedCheckedItems(parentNode, false));
    }

    changedItems.push(startNode);

    return changedItems;
  }
}
