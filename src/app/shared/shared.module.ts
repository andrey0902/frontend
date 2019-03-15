import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule } from './tree/tree.module';
import {ProgressBarModule} from './progress-bar/progress-bar.module';

@NgModule({
  declarations: [],
  imports: [
    TreeModule,
    CommonModule,
    ProgressBarModule
  ],
  exports: [
    TreeModule
  ]
})
export class SharedModule {
}
