import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IterationService} from '../../core/services/iteration.service';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'lt-create-iteration',
  templateUrl: './create-iteration.component.html',
  styleUrls: ['./create-iteration.component.scss']
})
export class CreateIterationComponent implements OnInit {
  iterationForm: FormGroup;
  meetTypes$: Observable<any>;
  weekDays = [
    { id: 1, title: 'Пн' },
    { id: 2, title: 'Вт' },
    { id: 3, title: 'Ср' },
    { id: 4, title: 'Чт' },
    { id: 5, title: 'Пт' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private iterationService: IterationService
  ) { }

  get startDate() { return this.iterationForm.get('startDate'); }
  get endDate() { return this.iterationForm.get('endDate'); }
  get goal() { return this.iterationForm.get('goal'); }
  get meetType() { return this.iterationForm.get('meetType'); }
  get weekDay() { return this.iterationForm.get('weekDay'); }

  ngOnInit() {
    this.meetTypes$ = this.iterationService.getMeetTypes();

    this.iterationForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      goal: ['', Validators.required],
      projectLink: [''],
      meetType: ['', Validators.required],
      weekDay: ['', Validators.required]
    });
  }

  onSubmit() {
    const protegeId = this.route.snapshot.paramMap.get('id');
    const iteration = this.iterationForm.value;

    this.iterationService.createIteration(protegeId, iteration).subscribe(() => {
      this.router.navigate(['/profile', protegeId]);
    });
  }

}
