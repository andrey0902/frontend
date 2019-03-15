import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IterationService} from '../../core/services/iteration.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatVerticalStepper} from '@angular/material';

@Component({
  selector: 'lt-create-iteration',
  templateUrl: './create-iteration.component.html',
  styleUrls: ['./create-iteration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateIterationComponent implements OnInit {

  @ViewChild(MatVerticalStepper) public stepper: MatVerticalStepper;

  iterationForm: FormGroup;
  currentIteration: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private iterationService: IterationService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.iterationForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      goal: ['', Validators.required],
      projectLink: [''],
      meetType: ['', Validators.required],
      weekDay: ['', Validators.required]
    });
  }

  createIteration() {
    const protegeId = this.route.snapshot.paramMap.get('id');
    const iteration = this.iterationForm.value;

    this.iterationService.createIteration(protegeId, iteration).subscribe((res) => {
      this.currentIteration = res;
      console.log(res);
      this.stepper.next();
    });
  }
  // TODO: Redirect to user profile after successful creation plan
  // this.router.navigate(['/profile', protegeId]);

}
