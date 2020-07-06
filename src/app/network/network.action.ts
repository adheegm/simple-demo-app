import { createAction, props } from '@ngrx/store';
import Network from './network.model';
import { HttpParams } from '@angular/common/http';

export const GetNetworkAction = createAction(
  'GET_NETWORK_ACTION',
  props<{ payload: HttpParams }>()
);

export const GetNetworkSuccessAction = createAction(
  'GET_NETWORK_SUCCESS_ACTION',
  props<{ payload: Network[] }>()
);

export const GetNetworkErrorAction = createAction(
  'GET_NETWORK_ERROR_ACTION',
  props<Error>()
);
