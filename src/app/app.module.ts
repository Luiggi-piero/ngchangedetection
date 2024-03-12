import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PrecioBitcoinProvider, ReattachComponent } from './components/reattach/reattach.component';
import { NgZoneComponent } from './components/ng-zone/ng-zone.component';
import { AsyncPipeComponent } from './components/async-pipe/async-pipe.component';
import { OnPushComponent } from './components/on-push/on-push.component';
import { DetachComponent } from './components/detach/detach.component';

@NgModule({
  declarations: [
    AppComponent,
    ReattachComponent,
    NgZoneComponent,
    AsyncPipeComponent,
    OnPushComponent,
    DetachComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [PrecioBitcoinProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
