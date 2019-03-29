import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationComponent} from './navigation/navigation.component';
import {HeaderComponent} from './header.component';
import {CanViewDirective} from './directives/can-view.directive';
import {MatSelectModule} from '@angular/material';


@NgModule({
  declarations: [
    HeaderComponent,
    NavigationComponent,
    CanViewDirective
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule
  ]
})
export class HeaderModule {
}
