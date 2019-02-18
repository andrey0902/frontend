import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddMentorDialogComponent} from './add-mentor-dialog/add-mentor-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material/material.module';
import { UserListComponent } from './user-list/user-list.component';
import {CoreModule} from '../../core/core.module';
import { ActionBtnComponent } from './action-btn/action-btn.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AddMentorDialogComponent,
    UserListComponent,
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
    AddMentorDialogComponent,
    UserListComponent,
    ActionBtnComponent,
    MaterialModule
  ]
})
export class SharedModule { }
