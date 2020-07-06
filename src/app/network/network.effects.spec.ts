import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { NetworkEffects } from './network.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as fromNetworkAction from './network.action';

import { TestScheduler } from 'rxjs/testing';
import { NetworkService } from './network.service';
import { HttpParams } from '@angular/common/http';
import Network from './network.model';

describe('NetworkEffects', () => {
  const initialState = { shows: [] };
  const networkService = jasmine.createSpyObj('networkService', [
    'getNetworks'
  ]);
  let effects: NetworkEffects;
  let actions: Observable<any>;
  let store: MockStore<any>;
  let testScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NetworkEffects,
        provideMockStore({ initialState }),
        provideMockActions(() => actions),
        { provide: NetworkService, useValue: networkService }
      ]
    });

    effects = TestBed.inject(NetworkEffects);
    store = TestBed.inject(MockStore);
    store.setState({});

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('GetNetworks$', () => {
    it('should handle GetNetworkAction and return a GetNetworkSuccessAction action', () => {
      const networks = [];
      const action = fromNetworkAction.GetNetworkAction({
        payload: new HttpParams({
          fromObject: {
            columns: 'row_id,time,type,sender,volume',
            receiver: 'tz1gfArv665EUkSg2ojMBzcbfwuPxAvqPvjo',
            limit: '10',
            order: 'desc'
          }
        })
      });
      const outcome = fromNetworkAction.GetNetworkSuccessAction({ payload: networks });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: action });
        const response = cold('-b|', { b: networks });
        networkService.getNetworks.and.returnValue(response);

        expectObservable(effects.GetNetworks$).toBe('--b', { b: outcome });
      });
    });
  });
});
