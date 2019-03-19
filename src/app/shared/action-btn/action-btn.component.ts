import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'lt-action-btn',
  templateUrl: './action-btn.component.html',
  styleUrls: ['./action-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionBtnComponent {

  @Input() tooltip: string;
  @Input() icon: string;
  @Output() action: EventEmitter<any> = new EventEmitter();

  emitAction() {
    this.action.emit();
  }

}
