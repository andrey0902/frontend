/**
 * Node for to-do item
 */
export type InputType = 'add' | 'edit' | false;

export class ItemNode {
  children: ItemNode[];
  showAsInput: InputType;
  order: number;
  text: string;
  id: number;
  parentId: number;
  isNew: boolean;
  is_completed: boolean;

  constructor(config) {
    this.children = config.children || [];
    this.showAsInput = false;
    this.isNew = false;
    this.order = config.order;
    this.text = config.text;
    this.id = config.id;
    this.parentId = config.parentId;
    this.is_completed = config.is_completed;
  }
}

/** Flat to-do item node with expandable and level information */
export class ItemFlatNode {
  text: string;
  showAsInput: InputType;
  id: number;
  level: number;
  expandable: boolean;
}
