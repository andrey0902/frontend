import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MentorshipComponent} from './mentorship.component';

const routes: Routes = [
  { path: '', component: MentorshipComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MentorshipRoutingModule { }
