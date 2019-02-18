import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {AddMentorDialogComponent} from '../shared/add-mentor-dialog/add-mentor-dialog.component';
import {DialogService} from '../shared/services/dialog.service';

@Component({
  selector: 'lt-mentor-protege',
  templateUrl: './mentor-protege.component.html',
  styleUrls: ['./mentor-protege.component.scss']
})
export class MentorProtegeComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private dialogService: DialogService
  ) { }

  mentorshipList = [
    {
      id: 1,
      firstName: 'Алексей',
      is_approved: true,
      is_dismissed: false,
      lastName: 'Дирацуян',
      photo: 'https://light-it-portal-gallery-dev.s3.amazonaws.com:443/users/77/fullsize/photo_20d592a0_alex_scream89.png',
      photoThumbnail: 'https://light-it-portal-gallery-dev.s3.amazonaws.com:443/users/77/thumbnail/photo_9923c058_alex_scream89.png',
      proteges: [
        {
          firstName: 'Анастасия',
          id: 9,
          is_approved: true,
          is_dismissed: false,
          lastName: 'Игнашова',
          photo: 'https://light-it-portal-gallery-dev.s3.amazonaws.com:443/users/9/fullsize/photo_d72f2605_20170508_101647.jpg',
          photoThumbnail: 'https://light-it-portal-gallery-dev.s3.amazonaws.com:443/users/9/thumbnail/photo_d72f2605_20170508_101647.jpg'
        },
        {
          firstName: 'Анастасия',
          id: 5,
          is_approved: true,
          is_dismissed: false,
          lastName: 'Игнашова',
          photo: 'https://light-it-portal-gallery-dev.s3.amazonaws.com:443/users/9/fullsize/photo_d72f2605_20170508_101647.jpg',
          photoThumbnail: 'https://light-it-portal-gallery-dev.s3.amazonaws.com:443/users/9/thumbnail/photo_d72f2605_20170508_101647.jpg'
        }
      ]
    },
    {
      id: 2,
      firstName: 'Алексей',
      is_approved: true,
      is_dismissed: false,
      lastName: 'Дирацуян',
      photo: 'https://light-it-portal-gallery-dev.s3.amazonaws.com:443/users/77/fullsize/photo_20d592a0_alex_scream89.png',
      photoThumbnail: 'https://light-it-portal-gallery-dev.s3.amazonaws.com:443/users/77/thumbnail/photo_9923c058_alex_scream89.png',
      proteges: [
        {
          firstName: 'Анастасия',
          id: 10,
          is_approved: true,
          is_dismissed: false,
          lastName: 'Игнашова',
          photo: 'https://light-it-portal-gallery-dev.s3.amazonaws.com:443/users/9/fullsize/photo_d72f2605_20170508_101647.jpg',
          photoThumbnail: 'https://light-it-portal-gallery-dev.s3.amazonaws.com:443/users/9/thumbnail/photo_d72f2605_20170508_101647.jpg'
        },
        {
          firstName: 'Анастасия',
          id: 6,
          is_approved: true,
          is_dismissed: false,
          lastName: 'Игнашова',
          photo: 'https://light-it-portal-gallery-dev.s3.amazonaws.com:443/users/9/fullsize/photo_d72f2605_20170508_101647.jpg',
          photoThumbnail: 'https://light-it-portal-gallery-dev.s3.amazonaws.com:443/users/9/thumbnail/photo_d72f2605_20170508_101647.jpg'
        }
      ]
    }
  ];

  ngOnInit() {}

  addMentor() {
    const dialogRef = this.dialog.open(AddMentorDialogComponent, {
      width: '500px',
      data: {mentor: 'Hello, mentor'},
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed:', result);
    });
  }

  deleteMentor(mentor) {
    const htmlContent = `<p>Вы уверены, что <b>${mentor.firstName} ${mentor.lastName}</b> больше не ментор ?</p>`;

    this.dialogService.openConfirmDialog(htmlContent, (result) => {
      console.log('Delete mentor:', result);
    });
  }

  deleteProtege(mentor, protege) {
    const htmlContent = `<p>Вы уверены, что <b>${protege.firstName} ${protege.lastName}</b> больше не протеже для <b>${mentor.firstName} ${mentor.lastName}</b> ?</p>`;

    this.dialogService.openConfirmDialog(htmlContent, (result) => {
      console.log('Delete protege:', result);
    });
  }

  clearProtegeStatus(protege) {
    const htmlContent = `<p>Вы уверены, что хотите очистить статус протеже для <b>${protege.firstName} ${protege.lastName}</b> ?</p>`;

    this.dialogService.openConfirmDialog(htmlContent, (result) => {
      console.log('Clear protege status:', result);
    });
  }

}
