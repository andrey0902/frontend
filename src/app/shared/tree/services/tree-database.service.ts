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

  set type(value: { new(...args: any[]): ItemNode }) {
    this._type = value;
  }

  private _type: new (...args: any[]) => ItemNode = ItemNode;

  dataChange = new BehaviorSubject<ItemNode[]>([]);

  get data(): ItemNode[] {
    return this.dataChange.value;
  }

  set data(data: ItemNode[]) {
    this.dataChange.next(data);
  }

  update() {
    this.dataChange.next(this.data);
  }

  /** Add an item to to-do list */
  insertItem(parent: ItemNode, item: ItemNode, isNew = false): ItemNode {
    let arr: ItemNode[];

    if (!isNew) {
      const oldParent = this.getParentOfNode(item);
      const oldArr = oldParent ? oldParent.children : this.data;
      this.deleteNode(item, oldArr);
      this._recalculateOrdering(oldArr);
    }

    if (parent === null) {
      item.parentId = null;
      arr = this.data;
    } else if (parent) {
      arr = parent.children;
      item.parentId = parent.id;
    }

    item.isNew = isNew;

    arr.unshift(item);
    this._recalculateOrdering(arr);
    return item;
  }

  insertItemNear(nodeAnchor: ItemNode, insertNode: ItemNode, typeInsertion: InsertionType): ItemNode {

    const oldParentNode = this.getParentOfNode(insertNode);
    const parentNode = this.getParentOfNode(nodeAnchor);
    const arr = parentNode != null ? parentNode.children : this.data;
    const oldArr = oldParentNode != null ? oldParentNode.children : this.data;
    const oldIndex = oldArr.indexOf(insertNode);

    this.deleteNode(insertNode, oldArr);
    this._recalculateOrdering(oldArr);

    let newOrder: number = nodeAnchor.order;
    let index: number = arr.indexOf(nodeAnchor);

    if (typeInsertion === InsertionType.BELOW) {
      index++;
      newOrder++;
    }

    insertNode.parentId = parentNode ? parentNode.id : null;
    insertNode.order = newOrder;
    arr.splice(index, 0, insertNode);
    this._recalculateOrdering(arr);
    return insertNode;
  }

  getParentOfNode(node: ItemNode): ItemNode {
    if (node && node.parentId) {
      return this.getNodeById(node.parentId);
    }
    return undefined;
  }

  getNodeById(nodeId: number, nodes: ItemNode[] = this.data): ItemNode {
    let node: ItemNode;
    for (let i = 0; i < nodes.length; ++i) {
      if (nodes[i].id === nodeId) {
        node = nodes[i];
      }
      if (!node && nodes[i].children.length > 0) {
        node = this.getNodeById(nodeId, nodes[i].children);
      }
      if (node) {
        break;
      }
    }
    return node;
  }

  copyPasteItem(from: ItemNode, to: ItemNode): ItemNode {
    return this.insertItem(to, from);
  }

  deleteNode(nodeToDelete: ItemNode, nodes: ItemNode[] = null) {
    const children = this.getParentOfNode(nodeToDelete) && this.getParentOfNode(nodeToDelete).children;
    const deleteFrom = nodes || children || this.data;
    const index = deleteFrom.indexOf(nodeToDelete, 0);
    if (index > -1) {
      deleteFrom.splice(index, 1);
      this._recalculateOrdering(deleteFrom);
    }
  }

  private _recalculateOrdering(arr: ItemNode[]): void {
    arr.forEach((item: ItemNode, index: number) => item.order = index);
  }
}
