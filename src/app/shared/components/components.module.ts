import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActionBtnComponent} from './action-btn/action-btn.component';
import {NavTabsComponent} from './nav-tabs/nav-tabs.component';
import {SafeHtmlPipe} from './pipes/safe-html.pipe';
import {SvgIconComponent} from './svg-icon/svg-icon.component';
import {UserComponent} from './user/user.component';
import { MatBadgeModule, MatButtonModule, MatIconModule, MatMenuModule, MatProgressBarModule, MatTabsModule, MatTooltipModule } from '@angular/material';
import {RouterModule} from '@angular/router';
import {UserPermissionDirective} from './directives/user-permission.directive';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import {ProgressBarComponent} from './progress-bar/progress-bar.component';
import {WrapLinkPipe} from './pipes/wrap-link.pipe';

@NgModule({
  declarations: [
    ActionBtnComponent,
    NavTabsComponent,
    SafeHtmlPipe,
    SvgIconComponent,
    UserComponent,
    ProgressBarComponent,
    UserPermissionDirective,
    AutoFocusDirective,
    WrapLinkPipe
  ],
  exports: [
    ActionBtnComponent,
    NavTabsComponent,
    SafeHtmlPipe,
    SvgIconComponent,
    UserComponent,
    ProgressBarComponent,
    UserPermissionDirective,
    AutoFocusDirective,
    WrapLinkPipe
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
    MatTabsModule,
    MatButtonModule,
    MatProgressBarModule,
    MatBadgeModule,
  ]
})
export class ComponentsModule {
}
