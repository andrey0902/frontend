import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MentorshipComponent} from './mentorship.component';

const routes: Routes = [
  { path: '', component: MentorshipComponent, children: [
    { path: 'mentor-protege',  loadChildren: './mentor-protege/mentor-protege.module#MentorProtegeModule' },
    { path: 'need-a-mentor',  loadChildren: './need-a-mentor/need-a-mentor.module#NeedAMentorModule' },
    { path: 'want-to-be-mentor',  loadChildren: './want-to-be-mentor/want-to-be-mentor.module#WantToBeMentorModule' },
    { path: '', redirectTo: 'mentor-protege', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MentorshipRoutingModule { }
