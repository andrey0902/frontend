import { Component } from '@angular/core';

@Component({
  selector: 'lt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  navLinks = [
    { path: '/mentorship', label: 'Менторы и протеже' },
    { path: '/need-a-mentor', label: 'Нуждаюсь в менторе' },
    { path: '/want-to-be-mentor', label: 'Хочу быть ментором' }
  ];

}
