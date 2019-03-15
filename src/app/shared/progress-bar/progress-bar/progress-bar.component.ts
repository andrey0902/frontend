import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'lt-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit, OnChanges {
  @Input()
  public progress = 0;
  @Input()
  public endPoint = 100;
  public progressInPercent: number;

  public ngOnInit(): void {
  }

  public ngOnChanges(): void {
    this.progressInPercent = Math.round(this.progress * 100 / this.endPoint) || 0;
  }
}
