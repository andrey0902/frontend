import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IterationTaskModel, TreeHelper } from '../../personal-plan/shared/models/iteration-plan.model';
import { IProgress } from '../../personal-plan/shared/models/progress.model';

@Component({
  selector: 'lt-protege-progress',
  templateUrl: './protege-progress.component.html',
  styleUrls: ['./protege-progress.component.scss']
})
export class ProtegeProgressComponent implements OnInit, OnChanges {
  @Input() plan: IterationTaskModel[] = [];
  progress: IProgress;
  public progressInPercent: number;


  constructor() { }

  ngOnInit() {
  }

  public ngOnChanges(): void {
    this.progress = this.treeDataChanged(this.plan);
    this.progressInPercent = Math.round(this.progress.progress * 100 / this.progress.endPoint) || 0;
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
