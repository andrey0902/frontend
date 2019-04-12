import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileComponent} from './profile.component';
import {CreateIterationComponent} from './create-iteration/create-iteration.component';
import {CreateIterationGuard} from '../core/guards/create-iteration.guard';
import { ProfileGuard } from '../core/guards/profile.guard';
import { DashboardService } from './shared/services/dashboard.service';

const routes: Routes = [
  { path: '', component: ProfileComponent, resolve: {user: DashboardService} },
  { path: ':id', component: ProfileComponent, canActivate: [ProfileGuard]},
  { path: ':id/create-iteration', component: CreateIterationComponent, canActivate: [CreateIterationGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }

