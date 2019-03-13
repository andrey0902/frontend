import {Component, Input, OnInit} from '@angular/core';
import {Iteration} from '../../models/iteration.model';
import {ItemNode} from '../../shared/tree/models/item-node.model';
import {InfoPlanModel} from '../../personal-plan/shared/models/info-plan.model';
import {IterationTreeService} from '../../core/services/iteration-tree.service';
import {combineLatest, Observable} from 'rxjs';

@Component({
  selector: 'lt-profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrls: ['./profile-overview.component.scss']
})
export class ProfileOverviewComponent implements OnInit {
  @Input() iteration: Iteration;
  public itemConstructor = InfoPlanModel;
  public tasks: InfoPlanModel[] = [];

  constructor(private treeService: IterationTreeService) {
  }

  currentIteration = {
    id: 1,
    user_id: 2,
    goal: 'Получить 5 уровень',
    format: 'YYYY-MM-DD',
    startDate: new Date('2019-01-07 11:33:05'),
    endDate: new Date('2019-04-21 11:33:05'),
    activities: [
      {type: 'meeting', title: 'Test title', date: new Date('2019-01-13 11:33:05')},
      {type: 'deploy', title: 'Test deploy', date: new Date('2019-01-19 11:33:05')}
    ]
  };

  ngOnInit() {
  }

  public deleteTreeItem(item: ItemNode): void {
    this.treeService.deleteTreeItem(item, this.iteration.user_id, this.iteration.id)
      .subscribe(response => console.log(response));
  }

  public createTreeItem(item: ItemNode): void {
    this.treeService.createTreeItem(item, this.iteration.user_id, this.iteration.id)
      .subscribe((responseItem: ItemNode) => item.id = responseItem.id);
  }

  public editTreeItem(item: ItemNode): void {
    this.treeService.editTreeItem(item, this.iteration.user_id, this.iteration.id)
      .subscribe(response => console.log(response));
  }

  public updateTreeItems(items: ItemNode[]): void {
    console.log(items);
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
    combineLatest(...requests).subscribe(response => console.log(response));
  }

}
