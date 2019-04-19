import {Component, Input} from '@angular/core';

@Component({
  selector: 'lt-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {
  @Input()
  public progress = 0;
  @Input()
  public endPoint = 100;
}
