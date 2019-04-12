import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MentorshipComponent} from './mentorship.component';
import {IsAdminGuard} from '../core/guards/is-admin.guard';

const routes: Routes = [
  { path: '', component: MentorshipComponent, children: [
    // { path: '', redirectTo: '', pathMatch: 'full'},
    { path: '',  loadChildren: './mentor-protege/mentor-protege.module#MentorProtegeModule' },
    { path: 'need-a-mentor',  loadChildren: './need-a-mentor/need-a-mentor.module#NeedAMentorModule', canLoad: [IsAdminGuard] },
    { path: 'want-to-be-mentor',  loadChildren: './want-to-be-mentor/want-to-be-mentor.module#WantToBeMentorModule', canLoad: [IsAdminGuard] }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MentorshipRoutingModule { }
