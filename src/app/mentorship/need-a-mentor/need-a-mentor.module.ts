import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NeedAMentorRoutingModule } from './need-a-mentor-routing.module';
import { NeedAMentorComponent } from './need-a-mentor.component';
import {CoreModule} from '../../core/core.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [NeedAMentorComponent],
  imports: [
    CommonModule,
    NeedAMentorRoutingModule,
    CoreModule,
    SharedModule
  ]
})
export class NeedAMentorModule { }
