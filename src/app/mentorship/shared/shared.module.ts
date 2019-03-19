import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MentorshipManagementDialogComponent} from './mentorship-management-dialog/mentorship-management-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material/material.module';
import {CoreModule} from '../../core/core.module';
import { ActionBtnComponent } from './action-btn/action-btn.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    MentorshipManagementDialogComponent,
    ActionBtnComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    CoreModule,
    RouterModule
  ],
  exports: [
    MentorshipManagementDialogComponent,
    ActionBtnComponent
  ],
  entryComponents: [
    MentorshipManagementDialogComponent
  ]
})

export class SharedModule {
}
