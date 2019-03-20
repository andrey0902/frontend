import { Component, Input, OnInit } from '@angular/core';
import { Iteration } from '../../models/iteration.model';
import * as momentOld from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(momentOld);

@Component({
  selector: 'lt-iteration-timeline',
  templateUrl: './iteration-timeline.component.html',
  styleUrls: [ './iteration-timeline.component.scss' ]
})
export class IterationTimelineComponent implements OnInit {

  @Input() iteration: Iteration;

  public weeks = [];
  public days = [];
  private tempWeeks = {};

  public get startDate(): any {
    return moment(this.iteration.startDate).format(this.iteration.format);
  }

  public get endDate(): any {
    return moment(this.iteration.endDate).format(this.iteration.format);
  }

  ngOnInit() {
    this.init();
  }

  init() {
    const range = moment().range(moment(this.iteration.startDate), moment(this.iteration.endDate));
    for (const day of range.by('days')) {
      this.days.push({
        date: day,
        meet: false,
        day: day.format('DD.MM'),
        weekend: this.checkWeekend(day)
      });
    }

    for (const day of range.by('days')) {
      this.createWeeks(day);
    }

    this.weeks = this.prepareDataWeeks(this.tempWeeks);

    for (const day of this.days) {
      for (const meetDay of this.iteration.meets) {
        if (day.date.isSame(moment(meetDay.attributes.meet_date), 'day')) {
          day.meet = true;
          day['metaData'] = meetDay;
        }
      }
    }
  }

  prepareDataWeeks(data) {
    const res = [];
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        res.push({
          weekNumber: key,
          length: data[key].length
        });
      }
    }
    return res;
  }

  checkWeekend(day): boolean {
    const weekDay = day.format('dddd').toLowerCase() ;
    return weekDay === 'sunday'  || weekDay === 'saturday';
  }

  createWeeks(day) {
    const numberWeeks = day.isoWeekday(1).week();

    if (!this.tempWeeks[numberWeeks]) {
      this.tempWeeks[numberWeeks] = [day];
    } else {
      this.tempWeeks[numberWeeks].push(day);
    }
  }

  getWidth(last): string {
    if (last) {
      return `${this.calculateDayWidth()}%`;
    }
    return `calc(${this.calculateDayWidth()}% - 1px)`;
  }

  calculateDayWidth(): number {
    return (1 / this.days.length) * 100;
  }

  timeLineCompleted(day): boolean {
    return new Date().getTime() > day.date.valueOf();
  }

  getToday(day): boolean {
     return day.date.isSame(moment(new Date()), 'day');
  }

}
