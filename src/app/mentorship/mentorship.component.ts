import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lt-mentorship',
  templateUrl: './mentorship.component.html',
  styleUrls: ['./mentorship.component.scss']
})
export class MentorshipComponent implements OnInit {

  constructor() { }

  navLinks = [
    { path: './mentor-protege', label: 'Менторы и протеже' },
    { path: './need-a-mentor', label: 'Нуждаюсь в менторе' },
    { path: './want-to-be-mentor', label: 'Хочу быть ментором' }
  ];

  ngOnInit() {
  }

}
