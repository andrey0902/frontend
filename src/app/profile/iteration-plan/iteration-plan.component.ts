import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IterationTaskModel} from '../../personal-plan/shared/models/iteration-plan.model';
import {ItemNode} from '../../shared/tree/models/item-node.model';
import {InfoPlanModel} from '../../personal-plan/shared/models/info-plan.model';
import {IProgress} from '../../personal-plan/shared/models/progress.model';

@Component({
  selector: 'lt-iteration-plan',
  templateUrl: './iteration-plan.component.html',
  styleUrls: ['./iteration-plan.component.scss']
})
export class IterationPlanComponent {
  @Input() tasks: IterationTaskModel[];
  @Input() progress: IProgress;

  @Output() public updateItem = new EventEmitter<ItemNode[]>();
  @Output() public deleteItem = new EventEmitter<ItemNode>();
  @Output() public createItem = new EventEmitter<ItemNode>();
  @Output() public editItem = new EventEmitter<ItemNode>();

  public itemConstructor = InfoPlanModel;

  public deleteTreeItem(item: ItemNode): void {
    this.deleteItem.emit(item);
  }

  public createTreeItem(item: ItemNode): void {
    this.createItem.emit(item);
  }

  public editTreeItem(item: ItemNode): void {
    this.editItem.emit(item);
  }

  public updateTreeItems(items: ItemNode[]): void {
    this.updateItem.emit(items);
  }
}
