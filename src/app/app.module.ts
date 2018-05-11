import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { IAppState, INITIAL_STATE, rootReducer } from './store';
import { TabActions } from './tabs/actions';
import { TabsComponent } from './tabs/tabs.component';

@NgModule({
  declarations: [AppComponent, TabsComponent],
  entryComponents: [TabsComponent],
  imports: [BrowserModule, NgReduxModule],
  providers: [TabActions],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    ngRedux: NgRedux<IAppState>,
    private devTools: DevToolsExtension
  ) {
    ngRedux.configureStore(
      rootReducer,
      INITIAL_STATE,
      [],
      [devTools.enhancer()]
    );
  }
}
