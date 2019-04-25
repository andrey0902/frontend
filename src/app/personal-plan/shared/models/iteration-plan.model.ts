import {ItemNode} from '../../../shared/tree/models/item-node.model';

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
    this.parentId = config.parentId;
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
      this.parentId = config.attributes.parent_task_id;
    }
  }
}

export class TreeHelper {
  public static treeStructureGenerator(tasksArray: ItemNode[]): ItemNode[] {
    const tasks: ItemNode[] = tasksArray.map((task) => new ItemNode(task));
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

  public static getExpandLevelOfNode(task: ItemNode): number {
    let lvl: number = 0;
    if (task.children.length > 0) {
      lvl++;
      task.children.forEach((child: ItemNode) => lvl += TreeHelper.getExpandLevelOfNode(child));
    }
    return lvl;
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

  public static getTreeProgress(items: ItemNode[], percent = 100): number {
    let progress = 0;
    if (items.length > 0) {
      const childPercent = percent / items.length;
      items.forEach((item: ItemNode) => {
        if (item.children.length > 0) {
          progress += this.getTreeProgress(item.children, childPercent);
        } else if (item.is_completed) {
          progress += childPercent;
        }
      });
    }
    return progress;
  }
}
