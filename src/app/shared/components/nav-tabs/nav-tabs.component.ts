import {Component, Input} from '@angular/core';

@Component({
  selector: 'lt-nav-tabs',
  templateUrl: './nav-tabs.component.html',
  styleUrls: ['./nav-tabs.component.scss']
})
export class NavTabsComponent {

  @Input() navLinks;
  @Input() wantToBeMentor;

}
