import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownMenuComponent } from './dropdown-menu.component';

@NgModule({
  declarations: [
    DropdownMenuComponent
  ],
  exports: [
    DropdownMenuComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DropdownMenuModule { }
