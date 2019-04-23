import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {plan} from '../../root-store/profile/plan/plan.selectors';
import {IterationTaskModel, TreeHelper} from '../../personal-plan/shared/models/iteration-plan.model';
import {Store} from '@ngrx/store';
import {ItemNode} from '../../shared/tree/models/item-node.model';


@Component({
  selector: 'lt-iteration-progress',
  templateUrl: './iteration-progress.component.html',
  styleUrls: ['./iteration-progress.component.scss']

})
export class IterationProgressComponent implements OnInit {
  @Input() plan: IterationTaskModel[] = [];
  progress: number;

  constructor(private store: Store<any>, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.store.select(plan)
      .subscribe((data: IterationTaskModel[]) => {
        const dataTree: ItemNode[] = TreeHelper.treeStructureGenerator(data);
        this.progress = Math.round(TreeHelper.getTreeProgress(dataTree));
      });
  }

}
