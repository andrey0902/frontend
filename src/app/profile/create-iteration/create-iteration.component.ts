import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IterationService} from '../../core/services/iteration.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatVerticalStepper} from '@angular/material';
import {Iteration} from '../../models/iteration.model';
import {CurrentIterationService} from '../services/iteration.service';

@Component({
  selector: 'lt-create-iteration',
  templateUrl: './create-iteration.component.html',
  styleUrls: ['./create-iteration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateIterationComponent implements OnInit {

  @ViewChild(MatVerticalStepper) public stepper: MatVerticalStepper;
  iterationForm: FormGroup;
  private _protegeId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private currentIterationService: CurrentIterationService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.iterationForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      goal: ['', Validators.required],
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

  // TODO: Redirect to user profile after successful creation plan
  //
}
