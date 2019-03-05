import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {protegesReducer} from './proteges.reducer';


@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('proteges', protegesReducer)
  ]
})
export class ProtegesStoreModule { }
