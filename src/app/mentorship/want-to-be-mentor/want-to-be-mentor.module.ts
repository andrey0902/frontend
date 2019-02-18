import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WantToBeMentorRoutingModule } from './want-to-be-mentor-routing.module';
import { WantToBeMentorComponent } from './want-to-be-mentor.component';
import {CoreModule} from '../../core/core.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [WantToBeMentorComponent],
  imports: [
    CommonModule,
    WantToBeMentorRoutingModule,
    CoreModule,
    SharedModule
  ]
})
export class WantToBeMentorModule { }
