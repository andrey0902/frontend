import {ItemNode} from '../shared/tree/models/item-node.model';

export class IterationTaskModel extends ItemNode {
  public id: number;
  public order: number;
  public parentId: number;
  public text: string;
  public description: string;
  public type: string;
  public children: IterationTaskModel[];
  public is_completed: null | boolean;

  /* this variables used for google analytic*/
  public isEditable = null;
  public isStatus = null;

  constructor(config: any = {}) {
    super(config);

    this.id = +config.id || null;
    this.order = config.order || 0;
    this.text = config.text || '';
    this.description = config.description || '';
    this.type = config.type || '';
    this.children = config.children && config.children.length > 0 ? config.children.map((child: IterationTaskModel) => new IterationTaskModel(child)) : [];
    this.is_completed = config.is_completed || false;
    this.isEditable = config.isEditable || null;
    this.isStatus = config.isStatus || null;
    this.parentId = +config.parentId;
  }

  public request() {
    return {
      order: this.order,
      text: this.text || '',
      description: this.description || '',
      is_completed: this.is_completed,
      parent_task_id: this.parentId || null
    };
  }
}

export class IterationTaskModelByConfig extends IterationTaskModel {
  constructor(config: any = {}) {
    super(config);
    if (config && config.attributes) {
      this.order = config.attributes.order || 0;
      this.text = config.attributes.text || '';
      this.description = config.attributes.description || '';
      this.is_completed = config.attributes.is_completed || false;
      this.parentId = +config.attributes.parent_task_id;
    }
  }
}


