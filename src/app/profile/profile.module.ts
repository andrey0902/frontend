import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {MaterialModule} from '../material/material.module';
import {CoreModule} from '../core/core.module';
import { ProfileOverviewComponent } from './profile-overview/profile-overview.component';
import { IterationTimelineComponent } from './iteration-timeline/iteration-timeline.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileOverviewComponent,
    IterationTimelineComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModule,
    CoreModule
  ]
})
export class ProfileModule { }
