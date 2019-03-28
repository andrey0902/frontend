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
  isNew = false;
  is_completed: boolean;
}

/** Flat to-do item node with expandable and level information */
export class ItemFlatNode {
  text: string;
  showAsInput: InputType;
  id: number;
  level: number;
  expandable: boolean;
}
