import { ItemNode } from '../../../shared/tree/models/item-node.model';

export class InfoPlanModel extends ItemNode {
  public id: number;
  public order: number;
  public parentId: number;
  public text: string;
  public type: string;
  public status: string;
  public statusBool: boolean;
  public type_display: string;
  public edit: boolean;
  public children = [];
  public is_completed: null | boolean;
  /* this variables used for google analytic*/
  public isEditable = null;
  public isStatus = null;

  constructor(desire: any = {}) {
    super(desire);
    this.id = desire.id;
    this.order = desire.order;
    this.status = desire.status;
    this.statusBool = desire.status === 'done';
    this.parentId = desire.parent ? desire.parent : 0;
    this.text = desire.text;
    this.type = desire.type ? desire.type : 'tasks';
    this.type_display = desire.type_display;
    this.edit = false;
    this.is_completed = desire.is_completed || desire.is_completed === false ? desire.is_completed : null;
  }

  public changeStatus(value) {
    this.status = !value ? 'open' : 'done';
  }
}
