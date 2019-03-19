import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatDialogModule} from '@angular/material';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {DialogService} from './providers/dialog.service';
import {CoreModule} from '../../core/core.module';
import {ActionBtnModule} from '../action-btn/action-btn.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    MatDialogModule,
    ActionBtnModule,
    MatButtonModule
  ],
  declarations: [
    ConfirmDialogComponent
  ],
  exports: [
    ConfirmDialogComponent
  ],
  providers: [
    DialogService
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})


export class DialogModule {
}
