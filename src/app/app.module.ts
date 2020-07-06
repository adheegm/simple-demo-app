import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { NetworkComponent } from './network/component/network.component';
import { reducers, metaReducers } from './app.reducers';
import { NetworkEffects } from './network/network.effects';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NetworkComponent,
  ],
  imports: [
    RouterModule.forRoot(AppRouting, {
      useHash: true,
      preloadingStrategy: PreloadAllModules
    }),
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    ScrollingModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictActionWithinNgZone: true,
        strictStateSerializability: true,
      }
    }),
    EffectsModule.forRoot([
      NetworkEffects
    ]),
    StoreDevtoolsModule.instrument()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
