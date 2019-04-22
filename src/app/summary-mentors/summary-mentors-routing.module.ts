import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SummaryMentorsComponent } from './summary-mentors/summary-mentors.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SummaryMentorsComponent
      }
    ]),
  ],
  exports: [
    RouterModule
  ]
})
export class SummaryMentorsRoutingModule { }
