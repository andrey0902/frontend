import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IterationTaskModel} from '../../personal-plan/shared/models/iteration-plan.model';
import {ItemNode} from '../../shared/tree/models/item-node.model';
import {InfoPlanModel} from '../../personal-plan/shared/models/info-plan.model';
import {IterationTreeService} from '../../core/services/iteration-tree.service';
import {combineLatest, Observable} from 'rxjs';
import {Iteration} from '../../models/iteration.model';

@Component({
  selector: 'lt-iteration-plan',
  templateUrl: './iteration-plan.component.html',
  styleUrls: ['./iteration-plan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IterationPlanComponent implements OnInit {
  @Input() iteration: Iteration;
  @Input() plan: IterationTaskModel[];

  @Output() public dataChanged = new EventEmitter<ItemNode[]>();

  public itemConstructor = InfoPlanModel;

  constructor(private treeService: IterationTreeService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.treeService.getTree(this.iteration.id, this.iteration.user_id)
      .subscribe((plan: IterationTaskModel[]) => {
        this.plan = IterationTaskModel.treeStructureGenerator(plan);
        this.cd.detectChanges();
      });
  }

  public deleteTreeItem(item: ItemNode): void {
    this.treeService.deleteTreeItem(item, this.iteration.user_id, this.iteration.id).subscribe();
  }

  public createTreeItem(item: ItemNode): void {
    this.treeService.createTreeItem(item, this.iteration.user_id, this.iteration.id)
      .subscribe((responseItem: ItemNode) => {
        item.id = responseItem.id;
        this.cd.detectChanges();
      });
  }

  public editTreeItem(item: ItemNode): void {
    this.treeService.editTreeItem(item, this.iteration.user_id, this.iteration.id).subscribe();
  }

  public updateTreeItems(items: ItemNode[]): void {
    const checkedItemsIds: number[] = [];
    const uncheckedItemsIds: number[] = [];
    const requests: Observable<any>[] = [];

    // get ids and sort in checked/unchecked arrays
    items.forEach((item: ItemNode) => item.is_completed ? checkedItemsIds.push(item.id) : uncheckedItemsIds.push(item.id));

    // create request for checked items
    if (checkedItemsIds.length > 0) {
      requests.push(this.treeService.updateTreeItems(checkedItemsIds, true, this.iteration.user_id, this.iteration.id));
    }

    // create request for unchecked items
    if (uncheckedItemsIds.length > 0) {
      requests.push(this.treeService.updateTreeItems(uncheckedItemsIds, false, this.iteration.user_id, this.iteration.id));
    }

    // send requests for checked and unchecked items together
    combineLatest(...requests).subscribe();
  }

  public treeDataChanged(items: ItemNode[]): void {
    this.dataChanged.emit(items);
  }
}
