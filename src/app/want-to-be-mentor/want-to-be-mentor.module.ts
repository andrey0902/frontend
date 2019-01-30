import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WantToBeMentorRoutingModule } from './want-to-be-mentor-routing.module';
import { WantToBeMentorComponent } from './want-to-be-mentor.component';

@NgModule({
  declarations: [WantToBeMentorComponent],
  imports: [
    CommonModule,
    WantToBeMentorRoutingModule
  ]
})
export class WantToBeMentorModule { }
