/**
 * Node for to-do item
 */
export type InputType = 'add' | 'edit' | false;

export class ItemNode {
  children: ItemNode[];
  showAsInput: InputType;
  order: number;
  text: string;
  description: string;
  id: number;
  parentId: number;
  isNew: boolean;
  is_completed: boolean;

  constructor(config) {
    this.children = config.children && config.children.length > 0 ? config.children.map((child) => new ItemNode(child)) : [];
    this.showAsInput = false;
    this.isNew = false;
    this.order = config.order;
    this.description = config.description;
    this.text = config.text;
    this.id = config.id;
    this.parentId = config.parentId;
    this.is_completed = config.is_completed;
  }
}

/** Flat to-do item node with expandable and level information */
export class ItemFlatNode {
  text: string;
  description: string;
  showAsInput: InputType;
  level: number;
  expandable: boolean;
}
