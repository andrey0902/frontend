import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MentorshipRoutingModule} from './mentorship-routing.module';

import { MentorshipComponent } from './mentorship.component';
import {MaterialModule} from '../material/material.module';
import {CoreModule} from '../core/core.module';
import {MentorshipManagementDialogComponent} from './mentorship-management-dialog/mentorship-management-dialog.component';
import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    MentorshipComponent,
    MentorshipManagementDialogComponent
  ],
  imports: [
    CommonModule,
    MentorshipRoutingModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [
    MentorshipManagementDialogComponent
  ]
})

export class MentorshipModule {}
