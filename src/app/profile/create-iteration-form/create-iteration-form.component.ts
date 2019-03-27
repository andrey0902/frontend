import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {IterationService} from '../../core/services/iteration.service';

@Component({
  selector: 'lt-create-iteration-form',
  templateUrl: './create-iteration-form.component.html',
  styleUrls: ['./create-iteration-form.component.scss']
})
export class CreateIterationFormComponent implements OnInit {

  @Input() public iterationForm: FormGroup;
  @Output() public submitForm = new EventEmitter<any>();
  meetTypes$: Observable<any>;
  weekDays = [
    { id: 1, title: 'Пн' },
    { id: 2, title: 'Вт' },
    { id: 3, title: 'Ср' },
    { id: 4, title: 'Чт' },
    { id: 5, title: 'Пт' }
  ];

  constructor(
    private iterationService: IterationService
  ) { }

  get startDate() { return this.iterationForm.get('time').get('startDate'); }
  get endDate() { return this.iterationForm.get('time').get('endDate'); }
  get goal() { return this.iterationForm.get('goal'); }
  get meetType() { return this.iterationForm.get('meetType'); }
  get weekDay() { return this.iterationForm.get('weekDay'); }

  ngOnInit() {
    this.meetTypes$ = this.iterationService.getMeetTypes();
  }

  onSubmit() {
    if (this.iterationForm.valid) {
      this.submitForm.emit();
    }
  }

}
