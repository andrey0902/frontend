import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NeedAMentorRoutingModule } from './need-a-mentor-routing.module';
import { NeedAMentorComponent } from './need-a-mentor.component';

@NgModule({
  declarations: [NeedAMentorComponent],
  imports: [
    CommonModule,
    NeedAMentorRoutingModule
  ]
})
export class NeedAMentorModule { }
