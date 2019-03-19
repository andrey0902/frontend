import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {DialogService} from './providers/dialog.service';
import {CoreModule} from '../../core/core.module';
import {ActionBtnModule} from '../action-btn/action-btn.module';
import {RequestDialogComponent} from './request-dialog/request-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    MatDialogModule,
    ActionBtnModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [
    ConfirmDialogComponent,
    RequestDialogComponent
  ],
  exports: [
    ConfirmDialogComponent,
    RequestDialogComponent
  ],
  providers: [
    DialogService
  ],
  entryComponents: [
    ConfirmDialogComponent,
    RequestDialogComponent
  ]
})


export class DialogModule {
}
