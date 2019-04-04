import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationComponent} from './navigation/navigation.component';
import {HeaderComponent} from './header.component';
import {CanViewDirective} from './directives/can-view.directive';
import {MatSelectModule} from '@angular/material';
import {TrustboxService} from './services/trustbox.service';
import {RouterModule} from '@angular/router';
import { TrustboxComponent } from './trustbox/trustbox.component';
import { DropdownMenuModule } from '../components/dropdown-menu/dropdown-menu.module';


@NgModule({
  declarations: [
    HeaderComponent,
    NavigationComponent,
    CanViewDirective,
    TrustboxComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    RouterModule,
    DropdownMenuModule,
  ],
  providers: [
    TrustboxService
  ]
})
export class HeaderModule {
}
