import { Component, OnInit, OnDestroy } from '@angular/core';
import NetworkState from '../network.state';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import * as fromNetwork from '../network.action';
import { map, takeUntil, delay } from 'rxjs/operators';
import Network from '../network.model';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-network',
  styleUrls: ['network.component.scss'],
  templateUrl: 'network.component.html'
})
export class NetworkComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject();
  networks$: Observable<NetworkState>;
  networkSubscription: Subscription;
  networkList: Network[] = [];
  networkError: Error = null;
  params: any = {
    columns: 'row_id,time,type,sender,volume',
    receiver: 'tz1gfArv665EUkSg2ojMBzcbfwuPxAvqPvjo',
    limit: '10',
    order: 'desc'
  };

  constructor(private store: Store<{ networks: NetworkState }>) {
    this.networks$ = store.pipe(select('networks'));
  }

  ngOnInit() {
    this.networkSubscription = this.networks$
      .pipe(
        delay(100),
        takeUntil(this.onDestroy$),
        map(data => {
          if (data.networks && !data.networks.length) {
            this.networkSubscription.unsubscribe();
          }
          this.networkList = [...this.networkList, ...data.networks || []];
          this.networkError = data.error;
          if (data.cursor) {
            this.params = { ...this.params, 'cursor.lt': data.cursor };
          } else {
            this.params = { ...this.params };
          }
          this.store.dispatch(fromNetwork.GetNetworkAction({ payload: new HttpParams({ fromObject:  this.params }) }));
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
