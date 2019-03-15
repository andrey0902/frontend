import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges} from '@angular/core';
import {Iteration} from '../../models/iteration.model';
import {ItemNode} from '../../shared/tree/models/item-node.model';
import {InfoPlanModel} from '../../personal-plan/shared/models/info-plan.model';
import {IterationTreeService} from '../../core/services/iteration-tree.service';
import {combineLatest, Observable} from 'rxjs';
import {IterationTaskModel} from '../../personal-plan/shared/models/iteration-plan.model';
import {IProgress} from '../../personal-plan/shared/models/progress.model';

@Component({
  selector: 'lt-profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrls: ['./profile-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileOverviewComponent {
  @Input() iteration: Iteration;
  progress: IProgress;

  constructor(private cd: ChangeDetectorRef) {
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

  public treeDataChanged(items: ItemNode[]): void {
    if (items && items.length > 0) {
      const children = IterationTaskModel.getChildrenFromTree(items as IterationTaskModel[]);
      let progress = 0;
      children.forEach((child: IterationTaskModel) => progress += +child.is_completed);
      this.progress = {
        endPoint: children.length,
        progress: progress
      };
      this.cd.detectChanges();
    }
  }
}
