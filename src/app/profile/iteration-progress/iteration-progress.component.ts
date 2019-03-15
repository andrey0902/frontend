import {Component, Input, OnInit} from '@angular/core';
import {IProgress} from '../../personal-plan/shared/models/progress.model';

@Component({
  selector: 'lt-iteration-progress',
  templateUrl: './iteration-progress.component.html',
  styleUrls: ['./iteration-progress.component.scss']
})
export class IterationProgressComponent implements OnInit {
  @Input() progress: IProgress;

  constructor() { }

  ngOnInit() {
  }

}
