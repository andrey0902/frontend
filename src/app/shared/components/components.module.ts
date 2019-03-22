import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActionBtnComponent} from './action-btn/action-btn.component';
import {HeaderComponent} from './header/header.component';
import {NavTabsComponent} from './nav-tabs/nav-tabs.component';
import {SafeHtmlPipe} from './pipes/safe-html.pipe';
import {SvgIconComponent} from './svg-icon/svg-icon.component';
import {UserComponent} from './user/user.component';
import {MatButtonModule, MatIconModule, MatMenuModule, MatTabsModule, MatTooltipModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {UserPermissionDirective} from './directives/user-permission.directive';
import {LazyImageDirective} from './directives/lazy-image.directive';

@NgModule({
  declarations: [
    ActionBtnComponent,
    HeaderComponent,
    NavTabsComponent,
    SafeHtmlPipe,
    SvgIconComponent,
    UserComponent,
    UserPermissionDirective,
    LazyImageDirective
  ],
  exports: [
    ActionBtnComponent,
    HeaderComponent,
    NavTabsComponent,
    SafeHtmlPipe,
    SvgIconComponent,
    UserComponent,
    UserPermissionDirective,
    LazyImageDirective
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
    MatTabsModule,
    MatButtonModule
  ]
})
export class ComponentsModule {
}
