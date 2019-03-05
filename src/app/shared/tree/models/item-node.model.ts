/**
 * Node for to-do item
 */
export class ItemNode {
  children: ItemNode[];
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
  level: number;
  expandable: boolean;
}
