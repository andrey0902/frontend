import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'mentorship' },
  { path: 'mentorship',  loadChildren: './mentorship/mentorship.module#MentorshipModule' },
  { path: 'need-a-mentor',  loadChildren: './need-a-mentor/need-a-mentor.module#NeedAMentorModule' },
  { path: 'want-to-be-mentor',  loadChildren: './want-to-be-mentor/want-to-be-mentor.module#WantToBeMentorModule' },
  { path: '**', redirectTo: 'mentorship' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
