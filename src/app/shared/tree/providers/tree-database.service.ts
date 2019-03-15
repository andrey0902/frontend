/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ItemNode} from '../models/item-node.model';

export enum InsertionType {
  ABOVE = 'above',
  BELOW = 'below'
}

@Injectable()
export class TreeDatabaseService {
  set deleteEventEmitter(value: EventEmitter<ItemNode>) {
    this._deleteEventEmitter = value;
  }

  set updateEventEmitter(value: EventEmitter<ItemNode[]>) {
    this._updateEventEmitter = value;
  }

  set type(value: { new(...args: any[]): ItemNode }) {
    this._type = value;
  }

  private _updateEventEmitter: EventEmitter<ItemNode[]>;
  private _deleteEventEmitter: EventEmitter<ItemNode>;
  private _type: new (...args: any[]) => ItemNode = ItemNode;

  dataChange = new BehaviorSubject<ItemNode[]>([]);

  get data(): ItemNode[] {
    return this.dataChange.value;
  }

  constructor() {
  }

  initialize(data: ItemNode[]) {
    // Notify the change.
    this.dataChange.next(this.buildFileTree(data));
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `ItemNode`.
   */
  buildFileTree(data: ItemNode[], parentId = 0): ItemNode[] {
    const completeArr: ItemNode[] = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (item.parentId === parentId) {
        item.children.push(...this.buildFileTree(data, item.id));
        completeArr.push(item);
      }
    }
    return completeArr.sort((a, b) => a.order - b.order);
  }

  /** Add an item to to-do list */
  insertItem(parent: ItemNode, item: ItemNode, isNew = false, raiseEvent = false): ItemNode {
    let arr: ItemNode[];
    if (parent === null) {
      item.parentId = null;
      item.order = this.data.length;
      arr = this.data;
    } else if (parent) {
      if (!parent.children) {
        parent.children = [];
      }
      arr = parent.children;
      item.parentId = parent.id;
    }

    item.order = 0;
    item.isNew = isNew;

    if (!isNew) {
      const oldParent = this.getParentFromNodes(item);
      const oldArr = oldParent ? oldParent.children : this.data;
      const oldIndex = oldArr.indexOf(item);
      this.deleteNode(item, oldArr);
      this.recalculateOrdering(oldArr, oldIndex, item.order);
    }

    arr.unshift(item);
    this.recalculateOrdering(arr, 1, 1);
    this.dataChange.next(this.data);
    if (raiseEvent) {
      this.updateEventEmitter.emit([item]);
    }
    return item;
  }

  insertItemNear(nodeAnchor: ItemNode, insertNode: ItemNode, typeInsertion: InsertionType): ItemNode {
    const oldParentNode = this.getParentFromNodes(insertNode);
    const parentNode = this.getParentFromNodes(nodeAnchor);
    const arr = parentNode != null ? parentNode.children : this.data;
    const oldArr = oldParentNode != null ? oldParentNode.children : this.data;
    const oldIndex = oldArr.indexOf(insertNode);

    this.deleteNode(insertNode, oldArr);
    this.recalculateOrdering(oldArr, oldIndex, insertNode.order);

    let newOrder: number = nodeAnchor.order;
    let index: number = arr.indexOf(nodeAnchor);

    if (typeInsertion === InsertionType.BELOW) {
      index++;
      newOrder++;
    }

    insertNode.parentId = parentNode ? parentNode.id : null;
    insertNode.order = newOrder;
    arr.splice(index, 0, insertNode);
    this.recalculateOrdering(arr, index + 1, insertNode.order + 1);
    this.dataChange.next(this.data);
    return insertNode;
  }

  getParentFromNodes(node: ItemNode): ItemNode {
    for (let i = 0; i < this.data.length; ++i) {
      const currentRoot = this.data[i];
      const parent = this.getParent(currentRoot, node);
      if (parent != null) {
        return parent;
      }
    }
    return null;
  }

  getParentsFromNodes(node: ItemNode): ItemNode[] {
    const parents: ItemNode[] = [];
    if (node && node.parentId) {
      const parent: ItemNode = this.getParentFromNodes(node);
      parents.push(parent);
      parents.push(...this.getParentsFromNodes(parent));
    }
    return parents;
  }

  getParent(currentRoot: ItemNode, node: ItemNode): ItemNode {
    if (currentRoot.children && currentRoot.children.length > 0) {
      for (let i = 0; i < currentRoot.children.length; ++i) {
        const child = currentRoot.children[i];
        if (child === node) {
          return currentRoot;
        } else if (child.children && child.children.length > 0) {
          const parent = this.getParent(child, node);
          if (parent != null) {
            return parent;
          }
        }
      }
    }
    return null;
  }

  updateItem(node: ItemNode, name: string, raiseEvent = false): ItemNode {
    node.text = name;
    this.dataChange.next(this.data);
    if (raiseEvent) {
      this.updateEventEmitter.emit([node]);
    }
    return node;
  }

  deleteItem(node: ItemNode, raiseEvent = false) {
    this.deleteNode(node);
    this.dataChange.next(this.data);
    if (raiseEvent) {
      this.deleteEventEmitter.emit(node);
    }
  }

  copyPasteItem(from: ItemNode, to: ItemNode): ItemNode {
    return this.insertItem(to, from);
  }

  deleteNode(nodeToDelete: ItemNode, nodes: ItemNode[] = null) {
    const children = this.getParentFromNodes(nodeToDelete) && this.getParentFromNodes(nodeToDelete).children;
    const deleteFrom = nodes || children || this.data;
    const index = deleteFrom.indexOf(nodeToDelete, 0);
    if (index > -1) {
      deleteFrom.splice(index, 1);
    }
  }

  private recalculateOrdering(arr: ItemNode[], beginIndex: number, startOrder = 0, endIndex?: number): ItemNode[] {
    let order = startOrder;
    const lastIndex = endIndex || arr.length - 1;
    for (let i = beginIndex; i <= lastIndex; i++) {
      const item = arr[i];
      item.order = order;
      order++;
    }
    return arr;
  }
}
