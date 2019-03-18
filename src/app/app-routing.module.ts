import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MentorsGuard } from './mentorship/shared/services/mentors-guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'mentorship' },
  { path: 'mentorship',  loadChildren: './mentorship/mentorship.module#MentorshipModule', canActivate: [MentorsGuard] },
  { path: 'profile',  loadChildren: './profile/profile.module#ProfileModule' },
  { path: 'plan', loadChildren: './personal-plan/personal-plan.module#PersonalPlanModule'},
  { path: '**', redirectTo: 'mentorship' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
