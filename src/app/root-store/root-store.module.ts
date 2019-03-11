import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {environment} from '../../environments/environment';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {CurrentUserStoreModule} from './currentUser/current-user-store.module';
import {MentorsStoreModule} from './mentors/mentors-store.module';
import {MentorRequestsStoreModule} from './mentor-requests/mentor-requests-store.module';
import {ProtegeRequestsStoreModule} from './protege-requests/protege-requests-store.module';

const STORES = [
  CurrentUserStoreModule,
  MentorsStoreModule,
  MentorRequestsStoreModule,
  ProtegeRequestsStoreModule
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
