import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentorProtegeRoutingModule } from './mentor-protege-routing.module';
import { MentorProtegeComponent } from './mentor-protege.component';
import {SharedModule} from '../shared/shared.module';
import {AddMentorDialogComponent} from '../shared/add-mentor-dialog/add-mentor-dialog.component';
import {CoreModule} from '../../core/core.module';

@NgModule({
  declarations: [
    MentorProtegeComponent
  ],
  imports: [
    CommonModule,
    MentorProtegeRoutingModule,
    SharedModule,
    CoreModule
  ],
  entryComponents: [
    AddMentorDialogComponent
  ]
})
export class MentorProtegeModule { }
