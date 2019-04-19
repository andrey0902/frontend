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
  public static treeStructureGenerator(tasks: ItemNode[]): ItemNode[] {
    let tasksTree: ItemNode[] = [];
    const tasksDictionary: { number: ItemNode } | {} = {};
    if (tasks && tasks.length > 0) {
      tasks.forEach((task: ItemNode) => tasksDictionary[task.id] = task);
      tasks.forEach((task: ItemNode) => {
        task.parentId ? tasksDictionary[task.parentId].children.push(task) : tasksTree.push(task);
      });
    }
    tasksTree = TreeHelper.sortTreeByOrder(tasksTree);
    return tasksTree;
  }

  public static sortTreeByOrder(tasks: ItemNode[]): ItemNode[] {
    tasks.forEach((task: ItemNode) => {
      if (task.children.length > 0) {
        task.children = TreeHelper.sortTreeByOrder(task.children);
      }
    });
    return tasks.sort((a, b) => a.order - b.order);
  }

  public static getAllNodeIds(task: ItemNode) {
    const nodeIds: number[] = [task.id];
    if (task.children.length > 0) {
      task.children.forEach((child: IterationTaskModel) => nodeIds.push(...TreeHelper.getAllNodeIds(child)));
    }
    return nodeIds;
  }
}
