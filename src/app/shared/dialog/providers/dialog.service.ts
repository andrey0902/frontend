import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {MentorshipManagementDialogComponent} from '../../../mentorship/shared/mentorship-management-dialog/mentorship-management-dialog.component';

@Injectable({
  providedIn: 'root'
})

export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(data, callback) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '960px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      callback(result);
    });
  }

  openMentorshipManagementDialog(data, callback) {
    const dialogRef = this.dialog.open(MentorshipManagementDialogComponent, {
      width: '500px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      callback(result);
    });
  }
}
