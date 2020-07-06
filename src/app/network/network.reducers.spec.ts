import * as fromNetworkReducer from './network.reducers';
import { initializeState } from './network.state';

describe('ShowsReducer', () => {
  it('should return the default state if unknown type', () => {
    const initialState = initializeState();
    const action = {
      type: 'unknown'
    };
    const state = fromNetworkReducer.NetworkReducer(initialState, action);

    expect(state).toBe(initialState);
  });
});
