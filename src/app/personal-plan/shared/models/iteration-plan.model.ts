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
    super(config);

    this.id = +config.id || null;
    this.order = config.order || 0;
    this.text = config.text || '';
    this.type = config.type || '';
    this.children = config.children && config.children.length > 0 ? config.children.map((child: IterationTaskModel) => new IterationTaskModel(child)) : [];
    this.is_completed = config.is_completed || false;
    this.isEditable = config.isEditable || null;
    this.isStatus = config.isStatus || null;
    this.parentId = config.parentId;
  }

  public request() {
    return {
      order: this.order,
      text: this.text || '',
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
      this.is_completed = config.attributes.is_completed || false;
      this.parentId = config.attributes.parent_task_id;
    }
  }
}

export class TreeHelper {
  public static treeStructureGenerator(tasks: IterationTaskModel[]): IterationTaskModel[] {
    let tasksTree: IterationTaskModel[] = [];
    const tasksDictionary: { number: IterationTaskModel } | {} = {};
    if (tasks && tasks.length > 0) {
      tasks.forEach((task: IterationTaskModel) => tasksDictionary[task.id] = task);
      tasks.forEach((task: IterationTaskModel) => {
        task.parentId ? tasksDictionary[task.parentId].children.push(task) : tasksTree.push(task);
      });
    }
    tasksTree = TreeHelper.sortTreeByOrder(tasksTree);
    return tasksTree;
  }

  public static sortTreeByOrder(tasks: IterationTaskModel[]): IterationTaskModel[] {
    tasks.forEach((task: IterationTaskModel) => {
      if (task.children.length > 0) {
        task.children = TreeHelper.sortTreeByOrder(task.children);
      }
    });
    return tasks.sort((a, b) => a.order - b.order);
  }

  // get all items, that doesn't have children, so they are not parents
  public static getChildrenFromTree(tasks: IterationTaskModel[]): IterationTaskModel[] {
    const children: IterationTaskModel[] = [];
    tasks.forEach((task: IterationTaskModel) => task.children.length > 0 ? children.push(...TreeHelper.getChildrenFromTree(task.children)) : children.push(task));
    return children;
  }

  public static getAllNodeIds(task: ItemNode) {
    const nodeIds: number[] = [task.id];
    if (task.children.length > 0) {
      task.children.forEach((child: IterationTaskModel) => nodeIds.push(...TreeHelper.getAllNodeIds(child)));
    }
    return nodeIds;
  }
}
