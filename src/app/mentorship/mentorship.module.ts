import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MentorshipRoutingModule} from './mentorship-routing.module';

import { MentorshipComponent } from './mentorship.component';
import {MaterialModule} from '../material/material.module';
import {CoreModule} from '../core/core.module';
import {SharedModule} from './shared/shared.module';
import {DialogModule} from '../shared/dialog/dialog.module';

@NgModule({
  declarations: [
    MentorshipComponent
  ],
  imports: [
    CommonModule,
    MentorshipRoutingModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    DialogModule
  ]
})

export class MentorshipModule {}
