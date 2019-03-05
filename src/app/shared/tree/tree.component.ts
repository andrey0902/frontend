import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { InsertionType, TreeDatabaseService } from './providers/tree-database.service';
import { ItemFlatNode, ItemNode } from './models/item-node.model';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'lt-tree',
  templateUrl: './tree.component.html',
  styleUrls: [ './tree.component.scss' ],
  providers: [ TreeDatabaseService ]
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
  }

  hasChild = (_: number, _nodeData: ItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: ItemFlatNode) => {
    return !_nodeData.text;
  }

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: ItemNode, level: number): ItemFlatNode => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.text === node.text
      ? existingNode
      : new ItemFlatNode();
    flatNode.text = node.text;
    flatNode.level = level;
    flatNode.expandable = (node.children && node.children.length > 0);
    if (node.is_completed) {
      this.checklistSelection.select(flatNode);
    }
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

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

  addItemToRoot(data: ItemNode) {
    data.parentId = null;
    this.database.insertItem(null, data, true);
    this.createItem.emit(data);
  }

  /** Select the category so we can insert the new item. */
  addNewItem(node: ItemFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    const isParentHasChildren = !!parentNode.children;

    this.database.insertItem(parentNode, new this.type(), true);
    if (isParentHasChildren) {
      this.treeControl.expand(node);
    }

  }

  /** Save the node to database */
  saveNode(node: ItemFlatNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    this.database.updateItem(nestedNode, itemValue);
    nestedNode.isNew = false;
    this.createItem.emit(nestedNode);
  }

  handleDragStart(event, node) {
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
      const {order: oldOrder, parentId: oldParentId} = this.flatNodeMap.get(this.dragNode);
      let newItem: ItemNode;
      if (this.dragNodeExpandOverArea === 'above') {
        newItem = this.database.insertItemNear(this.flatNodeMap.get(node), this.flatNodeMap.get(this.dragNode), InsertionType.ABOVE);
      } else if (this.dragNodeExpandOverArea === 'below') {
        newItem = this.database.insertItemNear(this.flatNodeMap.get(node), this.flatNodeMap.get(this.dragNode), InsertionType.BELOW);
      } else {
        newItem = this.database.copyPasteItem(this.flatNodeMap.get(this.dragNode), this.flatNodeMap.get(node));
      }
      if (oldOrder !== newItem.order && oldParentId !== newItem.parentId) {
        this.updateItem.emit([ newItem ]);
        this.treeControl.expandDescendants(this.nestedNodeMap.get(newItem));
      }
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

  changeCheckedParentItems(parent: ItemNode): ItemNode[] {
    const arr: ItemNode[] = [];
    const parentFlatNode = this.nestedNodeMap.get(parent);
    const allChildrenChecked = this.descendantsAllSelected(parentFlatNode);
    if (allChildrenChecked !== parent.is_completed) {
      parent.is_completed = allChildrenChecked;
      allChildrenChecked ? this.checklistSelection.select(parentFlatNode) : this.checklistSelection.deselect(parentFlatNode);
      arr.push(parent);
      if (!!parent.parentId) {
        const parentNode = this.database.getParentFromNodes(parent);
        arr.push(...this.changeCheckedParentItems(parentNode));
      }
    }
    return arr;
  }

  getChangedCheckedItems(startNode: ItemNode): ItemNode[] {
    const arr: ItemNode[] = [];
    const state = startNode.is_completed;
    const startFlatNode = this.nestedNodeMap.get(startNode);
    // check all children
    const descendants = this.treeControl.getDescendants(startFlatNode);
    if (descendants.length > 0) {
      descendants.forEach((item) => {
        const itemNode = this.flatNodeMap.get(item);
        if (itemNode.is_completed !== state) {
          itemNode.is_completed = state;
          arr.push(itemNode);
        }
      });
      state ? this.checklistSelection.select(...descendants) : this.checklistSelection.deselect(...descendants);
    }

    // check all parent
    const parentNode = this.database.getParentFromNodes(startNode);
    if (parentNode) {
      arr.push(...this.changeCheckedParentItems(parentNode));
    }
    arr.push(startNode);

    return arr;
  }
}
