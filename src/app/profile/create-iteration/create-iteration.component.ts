import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatVerticalStepper} from '@angular/material';
import {CurrentIterationService} from '../services/iteration.service';
import { LtValidators } from '../../shared/helpers/validator-methods.static';

@Component({
  selector: 'lt-create-iteration',
  templateUrl: './create-iteration.component.html',
  styleUrls: ['./create-iteration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateIterationComponent implements OnInit {

  @ViewChild(MatVerticalStepper) public stepper: MatVerticalStepper;
  iterationForm: FormGroup;
  treeChanged = false;

  private _protegeId: number;

  constructor(private route: ActivatedRoute, private router: Router, private currentIterationService: CurrentIterationService, private fb: FormBuilder,) {
  }

  ngOnInit() {
    this.iterationForm = this.fb.group({
      time: this.fb.group({
        startDate: ['', [
          Validators.required,
          LtValidators.checkDataStartIteration
        ]],
        endDate: ['', [
          Validators.required
        ]]
      }, {
        validator: LtValidators.checkEndDateIteration
      }),
      goal: ['', [
        Validators.required,
        Validators.minLength(3),
        LtValidators.checkSpace
      ]],
      projectLink: [''],
      meetType: ['', Validators.required],
      weekDay: ['', Validators.required]
    });

    this._protegeId = +this.route.snapshot.paramMap.get('id');
  }

  createIteration() {
    const iteration = this.iterationForm.value;
    this.currentIterationService.createIteration(this._protegeId, iteration)
      .subscribe(() => this.stepper.next());
  }

  onDone() {
    this.router.navigate(['/profile', this._protegeId]);
  }


  treeDataChanged($event) {
    if (!this.treeChanged && $event) {
      this.treeChanged = true;
    }

    // TODO: Redirect to user profile after successful creation plan
    //
  }
}
