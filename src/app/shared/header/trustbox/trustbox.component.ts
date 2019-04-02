import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'lt-trustbox',
  templateUrl: './trustbox.component.html',
  styleUrls: ['./trustbox.component.scss']
})
export class TrustboxComponent implements OnInit {
  @Input() PERMISSION_GROUPS: any;
  @Input() nav_links: any;
  @Input() countMessages: number;

  constructor() { }

  ngOnInit() {
  }

}
