import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentorProtegeRoutingModule } from './mentor-protege-routing.module';
import { MentorProtegeComponent } from './mentor-protege.component';
import {CoreModule} from '../../core/core.module';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import { ProtegeBlockModule } from '../../shared/components/protege-block/protege-block.module';

@NgModule({
  declarations: [
    MentorProtegeComponent
  ],
  imports: [
    CommonModule,
    MentorProtegeRoutingModule,
    SharedModule,
    CoreModule,
    RouterModule,
    ProtegeBlockModule,
  ]
})
export class MentorProtegeModule { }
