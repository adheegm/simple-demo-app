import {
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';

import * as fromNetworkAction from './network/network.reducers';

export interface State {
  networks: any;
}

export const reducers: ActionReducerMap<State> = {
  networks: fromNetworkAction.NetworkReducer,
};

export const metaReducers: MetaReducer<State>[] = [];
