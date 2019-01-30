import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'lt-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SvgIconComponent implements OnInit {
  @Input() name: string;

  constructor(private http: HttpClient) { }

  svg = '';

  ngOnInit() {
    this.http.get(`/assets/icons/${this.name}.svg`, {responseType: 'text'})
      .subscribe((svg) => {
        this.svg = svg;
      });
  }

}
