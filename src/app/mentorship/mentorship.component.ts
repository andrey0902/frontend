import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {AddMentorDialogComponent} from './add-mentor-dialog/add-mentor-dialog.component';

@Component({
  selector: 'lt-mentorship',
  templateUrl: './mentorship.component.html',
  styleUrls: ['./mentorship.component.scss']
})
export class MentorshipComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  mentorshipList = [
    {
      id: 1,
      first_name: 'Алексей',
      is_approved: true,
      is_dismissed: false,
      last_name: 'Дирацуян',
      photo: 'https://light-it-portal-gallery-dev.s3.amazonaws.com:443/users/77/fullsize/photo_20d592a0_alex_scream89.png',
      photo_thumbnail: 'https://light-it-portal-gallery-dev.s3.amazonaws.com:443/users/77/thumbnail/photo_9923c058_alex_scream89.png',
      proteges: [
        {
          first_name: 'Анастасия',
          id: 9,
          is_approved: true,
          is_dismissed: false,
          last_name: 'Игнашова',
          photo: 'https://light-it-portal-gallery-dev.s3.amazonaws.com:443/users/9/fullsize/photo_d72f2605_20170508_101647.jpg',
          photo_thumbnail: 'https://light-it-portal-gallery-dev.s3.amazonaws.com:443/users/9/thumbnail/photo_d72f2605_20170508_101647.jpg'
        },
        {
          first_name: 'Анастасия',
          id: 5,
          is_approved: true,
          is_dismissed: false,
          last_name: 'Игнашова',
          photo: 'https://light-it-portal-gallery-dev.s3.amazonaws.com:443/users/9/fullsize/photo_d72f2605_20170508_101647.jpg',
          photo_thumbnail: 'https://light-it-portal-gallery-dev.s3.amazonaws.com:443/users/9/thumbnail/photo_d72f2605_20170508_101647.jpg'
        }
      ]
    },
    {
      id: 2,
      first_name: 'Алексей',
      is_approved: true,
      is_dismissed: false,
      last_name: 'Дирацуян',
      photo: 'https://light-it-portal-gallery-dev.s3.amazonaws.com:443/users/77/fullsize/photo_20d592a0_alex_scream89.png',
      photo_thumbnail: 'https://light-it-portal-gallery-dev.s3.amazonaws.com:443/users/77/thumbnail/photo_9923c058_alex_scream89.png',
      proteges: [
        {
          first_name: 'Анастасия',
          id: 10,
          is_approved: true,
          is_dismissed: false,
          last_name: 'Игнашова',
          photo: 'https://light-it-portal-gallery-dev.s3.amazonaws.com:443/users/9/fullsize/photo_d72f2605_20170508_101647.jpg',
          photo_thumbnail: 'https://light-it-portal-gallery-dev.s3.amazonaws.com:443/users/9/thumbnail/photo_d72f2605_20170508_101647.jpg'
        },
        {
          first_name: 'Анастасия',
          id: 6,
          is_approved: true,
          is_dismissed: false,
          last_name: 'Игнашова',
          photo: 'https://light-it-portal-gallery-dev.s3.amazonaws.com:443/users/9/fullsize/photo_d72f2605_20170508_101647.jpg',
          photo_thumbnail: 'https://light-it-portal-gallery-dev.s3.amazonaws.com:443/users/9/thumbnail/photo_d72f2605_20170508_101647.jpg'
        }
      ]
    }
  ];

  ngOnInit() {
  }

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

}
