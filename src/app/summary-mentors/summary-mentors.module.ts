import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryMentorsRoutingModule } from './summary-mentors-routing.module';
import { SummaryMentorsComponent } from './summary-mentors/summary-mentors.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatBadgeModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressBarModule } from '@angular/material';
import { SummaryItemComponent } from './summary-item/summary-item.component';
import { SummaryProtegeComponent } from './summary-protege/summary-protege.component';
import { ProfileModule } from '../profile/profile.module';
import { ProtegeProgressComponent } from './protege-progress/protege-progress.component';

@NgModule({
  declarations: [
    SummaryMentorsComponent,
    SummaryItemComponent,
    SummaryProtegeComponent,
    ProtegeProgressComponent
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

    ProfileModule,
  ]
})
export class SummaryMentorsModule { }
