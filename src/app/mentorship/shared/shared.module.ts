import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddMentorDialogComponent} from './add-mentor-dialog/add-mentor-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material/material.module';

@NgModule({
  declarations: [
    AddMentorDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    AddMentorDialogComponent,
    MaterialModule
  ]
})
export class SharedModule { }
