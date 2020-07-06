import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Network from './network.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private httpClient: HttpClient) { }

  getNetworks(params: HttpParams): Observable<Network[]> {
    return this.httpClient.get<Network[]>(environment.apiUrl, { params })
      .pipe(
        map(response => {
          const networks: Network[] = [];
          response.forEach(element => {
            networks.push({
              id: element[0],
              time: element[1],
              type: element[2],
              sender: element[3],
              volume: element[4]
            });
          });
          return networks;
        })
      );
  }
}
