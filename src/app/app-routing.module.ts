import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'mentorship' },
  { path: 'mentorship',  loadChildren: './mentorship/mentorship.module#MentorshipModule' },
  { path: 'profile',  loadChildren: './profile/profile.module#ProfileModule' },
  { path: 'plan', loadChildren: './personal-plan/personal-plan.module#PersonalPlanModule'},
  { path: '**', redirectTo: 'mentorship' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
