import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {MaterialModule} from '../material/material.module';
import {CoreModule} from '../core/core.module';
import { ProfileOverviewComponent } from './profile-overview/profile-overview.component';
import { IterationTimelineComponent } from './iteration-timeline/iteration-timeline.component';
import { CreateIterationComponent } from './create-iteration/create-iteration.component';
import {ReactiveFormsModule} from '@angular/forms';
import { CreateIterationFormComponent } from './create-iteration-form/create-iteration-form.component';
import {SharedModule} from '../shared/shared.module';
import {ProgressBarModule} from '../shared/progress-bar/progress-bar.module';
import { IterationPlanComponent } from './iteration-plan/iteration-plan.component';
import { IterationProgressComponent } from './iteration-progress/iteration-progress.component';
import {CurrentIterationService} from './services/iteration.service';
import {CreateIterationGuard} from './services/create-iteration.guard';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileOverviewComponent,
    IterationTimelineComponent,
    CreateIterationComponent,
    CreateIterationFormComponent,
    IterationPlanComponent,
    IterationProgressComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModule,
    CoreModule,
    ReactiveFormsModule,
    SharedModule,
    ProgressBarModule
  ],
  providers: [
    CurrentIterationService,
    CreateIterationGuard
  ]
})
export class ProfileModule { }
