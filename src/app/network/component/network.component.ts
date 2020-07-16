import { Component, OnInit, OnDestroy } from '@angular/core';
import NetworkState from '../network.state';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import * as fromNetwork from '../network.action';
import { map, takeUntil, delay, catchError } from 'rxjs/operators';
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

  loading = false;
  allDataLoaded = false;

  constructor(private store: Store<{ networks: NetworkState }>) {
    this.networks$ = store.pipe(select('networks'));
    this.networkSubscription = this.networks$
      .pipe(
        delay(100),
        takeUntil(this.onDestroy$),
        map(data => {
          if (data.networks && !data.networks.length) {
            this.allDataLoaded = true;
            this.networkSubscription.unsubscribe();
          }
          this.networkList = [...this.networkList, ...data.networks || []];
          this.networkError = data.error;
          if (data.cursor) {
            this.params = { ...this.params, 'cursor.lt': data.cursor };
          } else {
            this.params = { ...this.params };
          }
          this.loading = false;
        }),
        catchError(async (err) => this.loading = false)
      )
      .subscribe();
  }

  ngOnInit() {
    this.fetchNextData();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  fetchNextData() {
    this.loading = true;
    this.store.dispatch(fromNetwork.GetNetworkAction({ payload: new HttpParams({ fromObject: this.params }) }));
  }

  onScroll(e: any) {
    if (this.loading || this.allDataLoaded || (e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight > 40)) {
      return;
    }
    this.fetchNextData();
  }

  getFirstChars(text: string) {
    return text.substr(0, 20);
  }

  getLastChars(text: string) {
    return text.substr(text.length - 10, text.length);
  }
}
