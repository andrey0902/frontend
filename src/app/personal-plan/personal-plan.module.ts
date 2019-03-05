import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routes } from './personal-plan-routing.module';
import { OwnPersonalPlanComponent } from './own-personal-plan/own-personal-plan.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TasksComponent } from './own-personal-plan/tasks/tasks.component';
import { OwnPlanResolver } from './own-personal-plan/shared/providers/own-plan.resolver';
import { FullTaskComponent } from './own-personal-plan/full-task/full-task.component';
import { PersonalPlansService } from './shared/providers/personal-plans.service';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [ OwnPersonalPlanComponent, TasksComponent, FullTaskComponent ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ OwnPlanResolver, PersonalPlansService ]
})
export class PersonalPlanModule {
}
