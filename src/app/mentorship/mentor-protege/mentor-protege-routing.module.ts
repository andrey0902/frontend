import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MentorProtegeComponent} from './mentor-protege.component';

const routes: Routes = [
  { path: '', component: MentorProtegeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MentorProtegeRoutingModule { }
