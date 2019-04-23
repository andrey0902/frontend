import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule } from './tree/tree.module';
import {DialogModule} from './dialog/dialog.module';
import {ComponentsModule} from './components/components.module';
import {HeaderModule} from './header/header.module';

@NgModule({
  imports: [
    TreeModule,
    CommonModule,
    DialogModule,
    ComponentsModule,
    HeaderModule
  ],
  exports: [
    TreeModule,
    DialogModule,
    ComponentsModule,
    HeaderModule
  ]
})
export class SharedModule {
}
