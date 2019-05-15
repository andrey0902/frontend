import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatVerticalStepper} from '@angular/material';
import {LtValidators} from '../../shared/helpers/validator-methods.static';
import {Store} from '@ngrx/store';
import {CreateIterationRequest} from '../../root-store/profile/iteration/iteration.actions';
import {selectIteration} from '../../root-store/profile/iteration/iteration.selectors';
import {filter, take, takeWhile} from 'rxjs/operators';
import {Iteration} from '../../models/iteration.model';
import {plan} from '../../root-store/profile/plan/plan.selectors';
import {IterationTaskModel} from '../../models/iteration-plan.model';
import {RegExpService} from '../../shared/helpers/reg-exp.service';

@Component({
  selector: 'lt-create-iteration',
  templateUrl: './create-iteration.component.html',
  styleUrls: ['./create-iteration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateIterationComponent implements OnInit, OnDestroy {

  @ViewChild(MatVerticalStepper) public stepper: MatVerticalStepper;
  iterationForm: FormGroup;
  currentIteration: Iteration;
  plan: IterationTaskModel[] = [];

  private _protegeId: number;
  public componentActive = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<any>
  ) {
  }

  ngOnInit() {
    this.iterationForm = this.fb.group({
      time: this.fb.group({
        startDate: ['', [Validators.required, LtValidators.checkDataStartIteration]],
        endDate: ['', [Validators.required]]
      }, { validator: LtValidators.checkEndDateIteration }),
      goal: ['', [Validators.required, LtValidators.checkSpace, Validators.minLength(3), Validators.maxLength(70)]],
      projectLink: ['', [LtValidators.checkSpace, Validators.minLength(3), Validators.maxLength(700)] ],
      meetType: ['', Validators.required],
      weekDay: ['', Validators.required]
    });

    this._protegeId = +this.route.snapshot.paramMap.get('id');
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  createIteration() {
    const iteration = this.iterationForm.value;
    this.store.dispatch(new CreateIterationRequest({userId: this._protegeId, iteration}));
    this.store.select(selectIteration).pipe(
      filter((iter) => !!iter),
      take(1)
    ).subscribe((result) => {
      this.currentIteration = result;
      this.store.select(plan)
        .pipe(
          takeWhile(() => this.componentActive)
        )
        .subscribe((data: IterationTaskModel[]) => this.plan = data);
      this.stepper.next();
    });
  }

  onDone() {
    this.router.navigate(['/mentorship/dashboard', this._protegeId]);
  }
}
