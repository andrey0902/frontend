import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActionBtnComponent} from './action-btn.component';
import {MatButtonModule, MatIconModule, MatTooltipModule} from '@angular/material';

@NgModule({
  declarations: [
    ActionBtnComponent
  ],
  exports: [
    ActionBtnComponent
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class ActionBtnModule {
}
