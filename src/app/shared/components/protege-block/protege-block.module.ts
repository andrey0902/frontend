import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtegeBlockComponent } from './protege-block.component';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [
    ProtegeBlockComponent
    ],
  exports: [
    ProtegeBlockComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ProtegeBlockModule { }
