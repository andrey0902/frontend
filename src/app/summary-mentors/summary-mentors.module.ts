import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryMentorsRoutingModule } from './summary-mentors-routing.module';
import { SummaryMentorsComponent } from './summary-mentors/summary-mentors.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatBadgeModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressBarModule } from '@angular/material';
import { SummaryItemComponent } from './summary-item/summary-item.component';

@NgModule({
  declarations: [
    SummaryMentorsComponent,
    SummaryItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatInputModule,
    MatProgressBarModule,
    MatBadgeModule,
    FormsModule,

    SummaryMentorsRoutingModule,
    SharedModule,
    CoreModule,
  ]
})
export class SummaryMentorsModule { }
