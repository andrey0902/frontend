import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import {RootStoreModule} from './root-store/root-store.module';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MAT_DATE_LOCALE} from '@angular/material';
import {CookieService} from 'ngx-cookie-service';
import {AuthInterceptor} from './core/services/auth.iterceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RootStoreModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    MatMomentDateModule
  ],
  providers: [
    CookieService,
    { provide: MAT_DATE_LOCALE, useValue: 'ru' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
