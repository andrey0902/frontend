import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileComponent} from './profile.component';
import {CreateIterationComponent} from './create-iteration/create-iteration.component';
import {CreateIterationGuard} from '../core/services/create-iteration.guard';

const routes: Routes = [
  { path: '', redirectTo: ':id', pathMatch: 'full' },
  { path: ':id', component: ProfileComponent },
  { path: ':id/create-iteration', component: CreateIterationComponent, canActivate: [CreateIterationGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
