import {Action} from '@ngrx/store';
import {User} from '../../models/user.model';

export enum ProtegesActionTypes {
  UPDATE_PROTEGES = '[Proteges] Update Proteges'
}

export class UpdateProteges implements Action {
  readonly type = ProtegesActionTypes.UPDATE_PROTEGES;

  constructor(public payload: User[]) {
  }
}

export type ProtegesActionUnion =
  | UpdateProteges;
