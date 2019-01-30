import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WantToBeMentorComponent} from './want-to-be-mentor.component';

const routes: Routes = [
  {path: '', component: WantToBeMentorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WantToBeMentorRoutingModule { }
