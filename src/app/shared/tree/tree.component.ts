import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {InsertionType, TreeDatabaseService} from './services/tree-database.service';
import {ItemFlatNode, ItemNode} from './models/item-node.model';
import {Observable, of} from 'rxjs';
import {DialogService} from '../dialog/services/dialog.service';
import {TreeHelper} from '../../personal-plan/shared/models/iteration-plan.model';
import {CreateTreeItemComponent} from './components/create-tree-item/create-tree-item.component';

@Component({
  selector: 'lt-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  providers: [TreeDatabaseService],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TreeComponent implements OnChanges, AfterViewInit {
  @Input() private data: ItemNode[];
  @Input() public type: new (...arg: any[]) => ItemNode;
  @Input() public editLevel: number;

  @Output() public updateItem = new EventEmitter<ItemNode[]>();
  @Output() public deleteItem = new EventEmitter<ItemNode>();
  @Output() public createItem = new EventEmitter<ItemNode>();
  @Output() public editItem = new EventEmitter<ItemNode>();

  @ViewChildren(CreateTreeItemComponent) inputView !: QueryList<CreateTreeItemComponent>;

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

  constructor(private database: TreeDatabaseService, private dialogService: DialogService, private cd: ChangeDetectorRef) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<ItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    database.dataChange
      .subscribe(data => {
        this.dataSource.data = [];
        this.dataSource.data = data;
      });
  }

  ngAfterViewInit(): void {
    this.inputView.changes.subscribe(() => this.cd.detectChanges());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue) {
      const newData = changes.data.currentValue.map((item) => new ItemNode(item));
      this.database.data = TreeHelper.treeStructureGenerator(newData);
      this.treeControl.expandAll();
    }

    if (changes.type && changes.type.currentValue) {
      this.database.type = changes.type.currentValue;
    }
  }

  getLevel = (node: ItemFlatNode) => node.level;

  getOrder = (node: ItemFlatNode) => +node.order as number;

  isExpandable = (node: ItemFlatNode) => node.expandable;

  isValidToAdd = (flatNode: ItemFlatNode) => {
    const node = this.flatNodeMap.get(flatNode);
    const nestingLevel = this.getLevel(flatNode) + 1;
    return nestingLevel < 3 && node.children.length < 100;
  };

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
    flatNode.order = node.order;
    flatNode.expandable = node.children.length > 0;

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

    this.updateItem.emit([...this.getChangedCheckedItems(node), node]);
  }

  /** add item(add value-item)**/
  addItemToRoot(nodeText: string) {
    if (this.dataSource.data.length < 100) {
      const data = new this.type();
      data.is_completed = false;
      data.text = nodeText;
      this.database.insertItem(null, data, true);
      this.database.update();
      this.createItem.emit(data);
    }
  }

  /** add item(add input-item) **/
  addNewItem(node: ItemFlatNode) {
    const parentNode = this.flatNodeMap.get(node);

    const data = new this.type();
    data.showAsInput = 'add';
    data.is_completed = false;

    this.database.insertItem(parentNode, data, true);
    this.database.update();

    if (!!parentNode.children) {
      this.treeControl.expand(node);
    }
  }

  /** add or edit item(replace input with value)**/
  addItem(nodeText: string, node: ItemFlatNode) {
    const data = this.flatNodeMap.get(node);
    data.showAsInput = false;
    data.text = nodeText;
    this.database.update();

    if (node.showAsInput === 'add') {
      this.updateItemCheck(data);
      this.createItem.emit(data);
    }

    if (node.showAsInput === 'edit') {
      this.editItem.emit(data);
    }
  }

  /** edit item(replace value with input)**/
  redactItem(node: ItemFlatNode) {
    const data = this.flatNodeMap.get(node);
    data.showAsInput = 'edit';
    data.isNew = false;
    this.database.update();
  }

  /** remove item **/
  removeItem(node: ItemFlatNode) {
    const data = this.flatNodeMap.get(node);

    if (node.showAsInput !== 'add' && node.showAsInput !== 'edit') {
      const htmlContent = `<p>Вы уверены, что хотите удалить пункт <b>${node.text}</b> ?</p>`;
      this.dialogService.openConfirmDialog({htmlContent}, (confirm) => {
        if (confirm) {
          this.database.deleteNode(data);
          this.database.update();
          this.updateItemCheck(this.database.getParentOfNode(data), false);
          this.deleteItem.emit(data);
        }
      });
    }

    if (node.showAsInput === 'add') {
      this.database.deleteNode(data);
      this.database.update();
    }

    if (node.showAsInput === 'edit') {
      data.showAsInput = false;
      this.database.update();
    }
  }

  updateItemCheck(node: ItemNode, checkChildren: boolean = true) {
    if (node) {
      const changesCheckedItems = this.getChangedCheckedItems(node, checkChildren);
      if (changesCheckedItems.length > 0) {
        this.updateItem.emit(changesCheckedItems);
      }
    }
  }

  // Drag'n'Drop
  handleNodeExpand(node) {
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
  }

  handleDragArea(node, event) {
    const percentageY = event.offsetY / event.target.clientHeight;
    if (percentageY < 0.25) {
      this.dragNodeExpandOverArea = 'above';
    } else if (percentageY > 0.75) {
      this.dragNodeExpandOverArea = 'below';
    } else {
      this.dragNodeExpandOverArea = 'center';
    }
  }

  getNewDropItem(flatNode: ItemFlatNode, dragNode: ItemNode): ItemNode {
    const node: ItemNode = this.flatNodeMap.get(flatNode);
    let newItem: ItemNode = null;

    if (this.dragNodeExpandOverArea === 'above' || this.dragNodeExpandOverArea === 'below') {
      const newParent = this.database.getParentOfNode(node);
      const isValidByChildren = node.parentId === dragNode.parentId || !newParent && this.dataSource.data.length < 100 || newParent.children.length < 100;
      const isValidByLevel = flatNode.level + TreeHelper.getExpandLevelOfNode(dragNode) < 3;
      const isValidToDrop = isValidByChildren && isValidByLevel;

      newItem = isValidToDrop ? this.database.insertItemNear(node, dragNode, this.dragNodeExpandOverArea) : null;
    } else if (this.dragNodeExpandOverArea === 'center') {
      const isValidByLevel = flatNode.level + TreeHelper.getExpandLevelOfNode(dragNode) < 2;
      const isValidToDrop = node.children.length < 100 && isValidByLevel;

      newItem = isValidToDrop ? this.database.copyPasteItem(dragNode, node) : null;
    }

    return newItem;
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

    if (node !== this.dragNode) {
      this.handleNodeExpand(node);
      this.handleDragArea(node, event);
    }
  }

  handleDrop(event, flatNode: ItemFlatNode) {
    event.preventDefault();
    const dragNode = this.flatNodeMap.get(this.dragNode);
    const {order: oldOrder, parentId: oldParentId} = dragNode;
    const newItem: ItemNode = flatNode !== this.dragNode ? this.getNewDropItem(flatNode, dragNode) : null;

    if (newItem) {
      this.database.update();

      if (oldOrder !== newItem.order || oldParentId !== newItem.parentId) {
        this.editItem.emit(newItem);
        this.treeControl.expandDescendants(this.nestedNodeMap.get(newItem));
      }

      this.updateItemCheck(this.database.getParentOfNode(dragNode), false);
      this.updateItemCheck(this.database.getParentOfNode(newItem), false);
    }

    this.dragNode = null;
    this.dragNodeExpandOverNode = null;
    this.dragNodeExpandOverTime = 0;
  }

  //

  getChangedCheckedItems(startNode: ItemNode, checkChildren: boolean = true): ItemNode[] {
    const changedItems: ItemNode[] = [];
    const nodeIsCompleted: boolean = startNode.is_completed;
    const startFlatNode: ItemFlatNode = this.nestedNodeMap.get(startNode);
    const flatDescendants: ItemFlatNode[] = this.treeControl.getDescendants(startFlatNode);
    const descendants: ItemNode[] = flatDescendants.map((descendant: ItemFlatNode) => this.flatNodeMap.get(descendant));

    // check all children and save changes

    if (descendants.length > 0 && checkChildren) {
      descendants.forEach((descendant) => {
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
        changedItems.push(startNode);
        allChildrenChecked ? this.checklistSelection.select(startFlatNode) : this.checklistSelection.deselect(startFlatNode);
      }
    }

    // check parent
    const parentNode = this.database.getParentOfNode(startNode);
    if (parentNode) {
      changedItems.push(...this.getChangedCheckedItems(parentNode, false));
    }

    return changedItems;
  }
}
