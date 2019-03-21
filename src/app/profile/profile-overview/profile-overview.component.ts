import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Iteration } from '../../models/iteration.model';
import { ItemNode } from '../../shared/tree/models/item-node.model';
import {IterationTaskModel} from '../../personal-plan/shared/models/iteration-plan.model';
import {IProgress} from '../../personal-plan/shared/models/progress.model';

@Component({
  selector: 'lt-profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrls: ['./profile-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileOverviewComponent implements OnInit, OnChanges {
  @Input() currentIteration: Iteration;

  progress: IProgress = null;
  objectValues = Object.values;

  constructor(private cd: ChangeDetectorRef) {}

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

  ngOnInit(): void {
    console.log('hi');
    console.log(this.currentIteration);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
