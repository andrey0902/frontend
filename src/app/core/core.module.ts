import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import {MaterialModule} from '../material/material.module';
import { UserComponent } from './components/user/user.component';
import {RouterModule} from '@angular/router';
import { NavTabsComponent } from './components/nav-tabs/nav-tabs.component';
import { PortraitUserComponent } from './components/portrait-user/portrait-user.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SafeHtmlPipe,
    SvgIconComponent,
    UserComponent,
    NavTabsComponent,
    PortraitUserComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    UserComponent,
    NavTabsComponent,
    SafeHtmlPipe,
    PortraitUserComponent
  ]
})
export class CoreModule { }
