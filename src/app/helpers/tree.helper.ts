import {ItemNode} from '../shared/tree/models/item-node.model';
import {IterationTaskModel} from '../models/iteration-plan.model';

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
    tasksTree = this.sortTreeByOrder(tasksTree);
    return tasksTree;
  }

  public static getExpandLevelOfNode(task: ItemNode): number {
    let lvl: number = 0;
    if (task.children.length > 0) {
      lvl++;
      task.children.forEach((child: ItemNode) => lvl += TreeHelper.getExpandLevelOfNode(child));
    }
    return lvl;
  }

  public static getAllNodeIds(task: ItemNode) {
    const nodeIds: number[] = [task.id];
    if (task.children.length > 0) {
      task.children.forEach((child: ItemNode) => nodeIds.push(...TreeHelper.getAllNodeIds(child)));
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

  public static getArrayFromTree(tasks: ItemNode[]): IterationTaskModel[] {
    const tasksTree: IterationTaskModel[] = [];
    tasks.forEach((task: ItemNode) => {
      const itTask = new IterationTaskModel(task);
      if (task.children.length > 0) {
        tasksTree.push(...this.getArrayFromTree(task.children));
        itTask.children = [];
      }
      if (itTask.id) {
        tasksTree.push(itTask);
      }
    });
    return tasksTree;
  }

  private static sortTreeByOrder(tasks: ItemNode[]): ItemNode[] {
    tasks.forEach((task: ItemNode) => {
      if (task.children.length > 0) {
        task.children = this.sortTreeByOrder(task.children);
      }
    });
    return tasks.sort((a, b) => a.order - b.order);
  }
}
