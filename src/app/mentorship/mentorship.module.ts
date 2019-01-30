import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MentorshipComponent } from './mentorship.component';
import {MentorshipRoutingModule} from './mentorship-routing.module';

import {SharedModule} from '../shared/shared.module';
import { AddMentorDialogComponent } from './add-mentor-dialog/add-mentor-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    MentorshipComponent,
    AddMentorDialogComponent
  ],
  imports: [
    CommonModule,
    MentorshipRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  entryComponents: [
    AddMentorDialogComponent
  ]
})
export class MentorshipModule { }
