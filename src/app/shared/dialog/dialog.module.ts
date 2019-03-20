import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatAutocompleteModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatTextareaAutosize} from '@angular/material';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {DialogService} from './services/dialog.service';
import {RequestDialogComponent} from './request-dialog/request-dialog.component';
import {MentorshipManagementDialogComponent} from './mentorship-management-dialog/mentorship-management-dialog.component';
import {DeleteIterationDialogComponent} from './delete-iteration-dialog/delete-iteration-dialog.component';
import {ComponentsModule} from '../components/components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    ComponentsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ConfirmDialogComponent,
    RequestDialogComponent,
    MentorshipManagementDialogComponent,
    DeleteIterationDialogComponent
  ],
  providers: [
    DialogService
  ],
  entryComponents: [
    ConfirmDialogComponent,
    RequestDialogComponent,
    MentorshipManagementDialogComponent,
    DeleteIterationDialogComponent
  ]
})


export class DialogModule {
}
