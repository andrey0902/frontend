import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentorProtegeRoutingModule } from './mentor-protege-routing.module';
import { MentorProtegeComponent } from './mentor-protege.component';
import {SharedModule} from '../shared/shared.module';
import {CoreModule} from '../../core/core.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    MentorProtegeComponent
  ],
  imports: [
    CommonModule,
    MentorProtegeRoutingModule,
    SharedModule,
    CoreModule,
    RouterModule
  ]
})
export class MentorProtegeModule { }
