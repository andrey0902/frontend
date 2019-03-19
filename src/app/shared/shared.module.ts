import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule } from './tree/tree.module';
import {ProgressBarModule} from './progress-bar/progress-bar.module';
import {DialogModule} from './dialog/dialog.module';
import {ActionBtnModule} from './action-btn/action-btn.module';

@NgModule({
  imports: [
    TreeModule,
    CommonModule,
    DialogModule,
    ProgressBarModule,
    ActionBtnModule
  ],
  exports: [
    TreeModule,
    ProgressBarModule,
    DialogModule,
    ActionBtnModule
  ]
})
export class SharedModule {
}
