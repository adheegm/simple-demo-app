import { Action, createReducer, on } from '@ngrx/store';
import * as NetWorkAction from './network.action';
import NetworkState, { initializeState } from './network.state';

const initialState = initializeState();

const reducer = createReducer(
  initialState,
  on(NetWorkAction.GetNetworkAction, state => state),
  on(NetWorkAction.GetNetworkSuccessAction, (state: NetworkState, { payload }) => {
    let cursor = null;
    if (payload.length) {
      cursor = payload[payload.length - 1].id;
    }
    return { ...state, networks: payload, error: null, cursor };
  }),
  on(NetWorkAction.GetNetworkErrorAction, (state: NetworkState, error: Error) => {
    return { ...state, error };
  }),
);

export function NetworkReducer(
  state: NetworkState | undefined,
  action: Action
): NetworkState {
  return reducer(state, action);
}
