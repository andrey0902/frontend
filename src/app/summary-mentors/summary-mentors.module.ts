import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryMentorsRoutingModule } from './summary-mentors-routing.module';
import { SummaryMentorsComponent } from './summary-mentors/summary-mentors.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatProgressBarModule, MatSelectModule } from '@angular/material';
import { SummaryItemComponent } from './summary-item/summary-item.component';
import { SummaryProtegeComponent } from './summary-protege/summary-protege.component';
import { ProfileModule } from '../profile/profile.module';
import { SearchModule } from '../shared/components/search/search.module';
import { ProtegeTasksComponent } from './protege-tasks/protege-tasks.component';

@NgModule({
  declarations: [
    SummaryMentorsComponent,
    SummaryItemComponent,
    SummaryProtegeComponent,
    ProtegeTasksComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatInputModule,
    MatProgressBarModule,
    MatCardModule,
    MatSelectModule,
    FormsModule,

    SummaryMentorsRoutingModule,
    SharedModule,
    CoreModule,

    ProfileModule,
    SearchModule,
  ]
})
export class SummaryMentorsModule { }
