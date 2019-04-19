import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {IProgress} from '../../personal-plan/shared/models/progress.model';
import {IterationTaskModel, TreeHelper} from '../../personal-plan/shared/models/iteration-plan.model';
import {Store} from '@ngrx/store';
import {ItemNode} from '../../shared/tree/models/item-node.model';
import {newPlan} from '../../root-store/profile/plan/plan.selectors';

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
    this.store.select(newPlan)
      .subscribe((data: IterationTaskModel[]) => {
        const dataTree: ItemNode[] = TreeHelper.treeStructureGenerator(data);
        this.progress = {
          endPoint: dataTree.length,
          progress: +TreeHelper.getProgress(dataTree).toFixed(1)
        };
      });
  }
}
