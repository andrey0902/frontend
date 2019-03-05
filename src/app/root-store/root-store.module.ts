import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {environment} from '../../environments/environment';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {UsersStoreModule} from './users/users-store.module';
import {MentorsStoreModule} from './mentors/mentors-store.module';
import {ProtegesStoreModule} from './proteges/proteges-store.module';

const STORES = [
  UsersStoreModule,
  MentorsStoreModule,
  ProtegesStoreModule
];

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument({
      name: 'Mentoring App',
      maxAge: 25
    }) : [],
    ...STORES
  ],
  exports: [
    StoreModule,
    EffectsModule,
    StoreDevtoolsModule
  ]
})
export class RootStoreModule { }
