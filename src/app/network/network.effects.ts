import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as NetworkActions from './network.action';
import { NetworkService } from './network.service';
import Network from './network.model';

@Injectable()
export class NetworkEffects {
  constructor(private networkService: NetworkService, private action$: Actions) { }

  GetNetworks$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(NetworkActions.GetNetworkAction),
      mergeMap(action =>
        this.networkService.getNetworks(action.payload).pipe(
          map((data: Network[]) => {
            return NetworkActions.GetNetworkSuccessAction({ payload: data });
          }),
          catchError((error: Error) => {
            return of(NetworkActions.GetNetworkErrorAction(error));
          })
        )
      )
    )
  );
}
