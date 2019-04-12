import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {IProgress} from '../../personal-plan/shared/models/progress.model';
import {plan} from '../../root-store/profile/plan/plan.selectors';
import {IterationTaskModel, TreeHelper} from '../../personal-plan/shared/models/iteration-plan.model';
import {Store} from '@ngrx/store';

@Component({
  selector: 'lt-iteration-progress',
  templateUrl: './iteration-progress.component.html',
  styleUrls: ['./iteration-progress.component.scss']

})
export class IterationProgressComponent implements OnInit {
  @Input() plan: IterationTaskModel[] = [];
  progress: IProgress;

  constructor(private store: Store<any>, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.store.select(plan)
      .subscribe((data: IterationTaskModel[]) => {
        this.progress = this.treeDataChanged(data);
      });
  }

  public treeDataChanged(items: IterationTaskModel[]): IProgress {
    if (items.length > 0) {
      const children = TreeHelper.getChildrenFromTree(items);
      let progress = 0;
      children.forEach((child: IterationTaskModel) => progress += +child.is_completed);
      return {
        endPoint: children.length,
        progress: progress
      };
    }
    return null;
  }

}
