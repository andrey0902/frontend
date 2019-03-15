import {ItemNode} from '../../../shared/tree/models/item-node.model';

export class IterationTaskModel extends ItemNode {
  public id: number;
  public order: number;
  public parentId: number;
  public text: string;
  public type: string;
  public children: IterationTaskModel[];
  public is_completed: null | boolean;
  /* this variables used for google analytic*/
  public isEditable = null;
  public isStatus = null;

  constructor(config: any = {}) {
    super();
    if (config && config.attributes) {
      this.id = config.id;
      this.order = config.attributes.order;
      this.parentId = config.attributes.parent_task_id;
      this.text = config.attributes.text;
      this.type = config.type;
      this.children = config.children || [];
      this.is_completed = config.attributes.is_completed;
    }
  }

  public static treeStructureGenerator(tasks: IterationTaskModel[]): IterationTaskModel[] {
    const tasksTree: IterationTaskModel[] = [];
    const tasksDictionary: { number: IterationTaskModel } | {} = {};
    tasks.forEach((task: IterationTaskModel) => tasksDictionary[task.id] = task);
    tasks.forEach((task: IterationTaskModel) => {
      task.parentId ? tasksDictionary[task.parentId].children.push(task) : tasksTree.push(task);
    });
    return tasksTree;
  }

  // get all items, that doesn't have children, so they are not parents
  public static getChildrenFromTree(tasks: IterationTaskModel[]): IterationTaskModel[] {
    const children: IterationTaskModel[] = [];
    tasks.forEach((task: IterationTaskModel) => task.children.length > 0 ? children.push(...IterationTaskModel.getChildrenFromTree(task.children)) : children.push(task));
    return children;
  }
}
