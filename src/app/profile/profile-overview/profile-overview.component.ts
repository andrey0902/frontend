import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { Iteration } from '../../models/iteration.model';
import {IProgress} from '../../personal-plan/shared/models/progress.model';
import {Rights} from '../profile.component';

@Component({
  selector: 'lt-profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrls: ['./profile-overview.component.scss'],
})

export class ProfileOverviewComponent implements OnChanges {
  @Input() currentIteration: Iteration;
  @Input() userRights: Rights;
  progress: IProgress = null;

  constructor() {}

/*  public treeDataChanged(items: ItemNode[]): void {
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
  }*/

  ngOnChanges(changes: SimpleChanges): void {
  }
}
