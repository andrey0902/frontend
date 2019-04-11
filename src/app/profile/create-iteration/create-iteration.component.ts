import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatVerticalStepper} from '@angular/material';
import { LtValidators } from '../../shared/helpers/validator-methods.static';
import {Store} from '@ngrx/store';
import {CreateIterationRequest} from '../../root-store/profile/iteration/iteration.actions';
import {selectIteration} from '../../root-store/profile/iteration/iteration.selectors';
import {filter, take} from 'rxjs/operators';
import {Iteration} from '../../models/iteration.model';
import {GetPlanRequest} from '../../root-store/profile/plan/plan.actions';
import {newPlan} from '../../root-store/profile/plan/plan.selectors';
import {IterationTaskModel} from '../../personal-plan/shared/models/iteration-plan.model';

@Component({
  selector: 'lt-create-iteration',
  templateUrl: './create-iteration.component.html',
  styleUrls: ['./create-iteration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateIterationComponent implements OnInit {

  @ViewChild(MatVerticalStepper) public stepper: MatVerticalStepper;
  iterationForm: FormGroup;
  currentIteration: Iteration;
  plan: IterationTaskModel[] = [];

  private _protegeId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.iterationForm = this.fb.group({
      time: this.fb.group({
        startDate: ['', [Validators.required, LtValidators.checkDataStartIteration]],
        endDate: ['', [Validators.required]]
      }, { validator: LtValidators.checkEndDateIteration }),
      goal: ['', [Validators.required, Validators.minLength(3)]],
      projectLink: [''],
      meetType: ['', Validators.required],
      weekDay: ['', Validators.required]
    });

    this._protegeId = this.route.snapshot.paramMap.get('id');
  }

  createIteration() {
    const iteration = this.iterationForm.value;
    this.store.dispatch(new CreateIterationRequest({userId: this._protegeId, iteration}));
    this.store.select(selectIteration).pipe(
      filter((iter) => !!iter),
      take(1)
    ).subscribe((result) => {
      this.currentIteration = result;
      this.store.dispatch(new GetPlanRequest({iterationId: this.currentIteration.id, userId: this.currentIteration.user_id}));
      this.store.select(newPlan).subscribe((data: IterationTaskModel[]) => this.plan = data);
      this.stepper.next();
    });
  }

  onDone() {
    this.router.navigate(['/profile', this._protegeId]);
  }
}
