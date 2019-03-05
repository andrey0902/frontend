import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule } from './tree/tree.module';

@NgModule({
  declarations: [],
  imports: [
    TreeModule,
    CommonModule
  ],
  exports: [
    TreeModule
  ]
})
export class SharedModule {
}
