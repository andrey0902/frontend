import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddMentorDialogComponent} from './add-mentor-dialog/add-mentor-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material/material.module';
import {CoreModule} from '../../core/core.module';
import { ActionBtnComponent } from './action-btn/action-btn.component';
import {RouterModule} from '@angular/router';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {DialogService} from './services/dialog.service';

@NgModule({
  declarations: [
    AddMentorDialogComponent,
    ActionBtnComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    CoreModule,
    RouterModule
  ],
  exports: [
    AddMentorDialogComponent,
    ConfirmDialogComponent,
    ActionBtnComponent,
    MaterialModule
  ],
  entryComponents: [
    AddMentorDialogComponent,
    ConfirmDialogComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [DialogService]
    };
  }
}
