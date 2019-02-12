import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NeedAMentorComponent} from './need-a-mentor.component';

const routes: Routes = [
  { path: '', component: NeedAMentorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NeedAMentorRoutingModule { }
