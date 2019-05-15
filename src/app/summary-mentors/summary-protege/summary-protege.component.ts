import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user.model';
import { IterationService } from '../../core/services/iteration.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { Iteration } from '../../models/iteration.model';
import { IterationTaskModel, IterationTaskModelByConfig} from '../../models/iteration-plan.model';
import { IterationPlanService } from '../../core/services/iteration-plan.service';
import {ItemNode} from '../../shared/tree/models/item-node.model';
import {TreeHelper} from '../../helpers/tree.helper';

@Component({
  selector: 'lt-summary-protege',
  templateUrl: './summary-protege.component.html',
  styleUrls: ['./summary-protege.component.scss']
})
export class SummaryProtegeComponent implements OnInit {
  @Input() user: User;
  @Output() getIteration = new EventEmitter<string>();
  iteration: Iteration;
  isLoad: boolean;
  tasks: IterationTaskModel[];
  public progressInPercent: number;
  public shoveIpr = false;
  public isEmptyTasks = null;

  constructor(private iterationService: IterationService, private planService: IterationPlanService) {
  }

  set load(value: boolean) {
    this.isLoad = value;
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.load = true;
    this.iterationService.getCurrentIteration(this.user.id)
      .pipe(map(data => {
        return new Iteration(data);
      }),
        tap((iteration) => {
          this.iteration = iteration;
        }),
        switchMap((iteration) => {
          return this.getTasks(this.user.id, iteration.id);
        }))
      .subscribe((tasks) => {
        // TODO: if change tree need to run method toCountProgress
        this.checkEmptyTask(tasks);
        this.toCountProgress(tasks);

        this.tasks = tasks;
        this.load = false;
      }, (err) => {
        this.load = false;
        this.iteration = null;
      });

  }

  getTasks(userId, iterationId) {
    return this.planService.getPlan(this.user.id, iterationId)
      .pipe(map(data => {
        const tasks: IterationTaskModel[] = data.map((task) => new IterationTaskModelByConfig(task));
        return  tasks;
      }));
  }

  toCountProgress(tasks) {
    if (!this.isEmptyTasks) {
      return;
    }
    const dataTree: ItemNode[] = TreeHelper.treeStructureGenerator(tasks);
    this.progressInPercent =  Math.round(TreeHelper.getTreeProgress(dataTree)) || 0;
  }

  setShoveIpr() {
    this.shoveIpr = !this.shoveIpr;
  }

  checkEmptyTask(tasks: any[]): void {
    this.isEmptyTasks = !!tasks.length;
  }
}
