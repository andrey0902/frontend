import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProgressBarComponent} from './progress-bar/progress-bar.component';
import { MatProgressBarModule } from '@angular/material';

@NgModule({
  declarations: [ProgressBarComponent],
  exports: [ProgressBarComponent],
  imports: [
    CommonModule,
    MatProgressBarModule,
  ]
})
export class ProgressBarModule {
}
