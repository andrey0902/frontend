import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SafeHtmlPipe } from './safe-html.pipe';
import { SvgIconComponent } from './svg-icon/svg-icon.component';
import {MaterialModule} from '../material.module';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SafeHtmlPipe,
    SvgIconComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent,
    MaterialModule,
    UserComponent
  ]
})
export class SharedModule { }
