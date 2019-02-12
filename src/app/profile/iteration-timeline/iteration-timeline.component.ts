import {Component, Input} from '@angular/core';
import {Iteration} from '../../models/iteration.model';

@Component({
  selector: 'lt-iteration-timeline',
  templateUrl: './iteration-timeline.component.html',
  styleUrls: ['./iteration-timeline.component.scss']
})
export class IterationTimelineComponent {

  @Input() iteration: Iteration;

  get iterationDuration() {
    return this.iteration.endDate - this.iteration.startDate;
  }

  getPercentage(duration) {
    return ((duration / this.iterationDuration) * 100).toFixed() + '%';
  }

  calculateTimeDuration(timestamp) {
    return timestamp - this.iteration.startDate;
  }

  get progressPercentage() {
    const now = new Date().getTime();
    const duration = this.calculateTimeDuration(now);
    return this.getPercentage(duration);
  }

  activityPosition(timestamp) {
    const duration = this.calculateTimeDuration(timestamp);
    const percentage = this.getPercentage(duration);
    return `calc(${percentage} - 8px)`;
  }

  showPopup(popup) {
    popup.style.opacity = 1;
  }

  hidePopup(popup) {
    popup.style.opacity = 0;
  }

}
