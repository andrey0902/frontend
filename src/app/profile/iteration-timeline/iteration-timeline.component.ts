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

  public months = [];

  public weeks = [];
  public days = [];

  public progress_percent: number;

  public get startDate(): any {
    return moment(this.iteration.startDate).format(this.iteration.format);
  }

  public get endDate(): any {
    return moment(this.iteration.endDate).format(this.iteration.format);
  }

  ngOnInit() {
    const range = moment().range(moment(this.iteration.startDate), moment(this.iteration.endDate));
    for (const week of range.by('days')) {
      this.days.push(week.format('DD-MM-YYYY'));
    }
    console.log(this.days);
    for (const week of range.by('weeks')) {
      this.weeks.push(week.format('DD'));
    }
    console.log(this.weeks);
    for (const month of range.by('months')) {
      console.log(month);
      const addMonth = {
        'date': month.format('DD-MM-YYYY'),
        'name': month.format('MMMM-YYYY'),
        'days': []
      };
      console.log(addMonth);
      // const dayRange = moment().range(moment(month.startOf('month'), this.iteration.format), moment(month.endOf('month'), this.iteration.format));
      for (const week of range.by('weeks')) {
        addMonth.days.push(week.format('DD'));
      }
      this.months.push(addMonth);
    }
    this.progress_percent = this.getPosition(moment());
  }

  public getPosition(date) {
    date = moment(date);
    const diff = date.diff(moment(this.startDate, this.iteration.format), 'months');
    const curWeekWidth = 100 / this.months[ diff ].days.length;
    const monthsWidth = 100 / this.months.length;
    const ixOfWeek = Math.ceil(date.format('D') / 7) - 1;
    const curDOfMPercent = (date.format('D') - this.months[ diff ].days[ ixOfWeek ]) * 14.28;

    return ((monthsWidth * diff) + (((ixOfWeek * curWeekWidth) + (curDOfMPercent / 100 * curWeekWidth)) / 100 * monthsWidth));
  }
}
