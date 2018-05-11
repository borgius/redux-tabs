import {
  NgRedux,
  ObservableStore,
  WithSubStore,
  dispatch,
  select
} from '@angular-redux/store';
import { Component, Input, OnInit } from '@angular/core';
import { prefixActionCreator } from 'mindfront-redux-utils';
import { TabActions } from './actions';
import { ITabsState, tabsReducer } from './store';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'my-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: tabsReducer
})
export class TabsComponent implements OnInit {
  subStore: ObservableStore<ITabsState>;
  @Input() basePath: string[];
  @select() tabs;
  @select() active;

  constructor(
    private actions: TabActions,
    private ngRedux: NgRedux<ITabsState>
  ) {}

  ngOnInit() {}

  private getBasePath() {
    return this.basePath;
  }

  public get prefix(): string {
    return this.getBasePath().join('.');
  }

  @dispatch()
  addTab(title, content) {
    return prefixActionCreator(this.prefix)(this.actions.addTab)(
      title,
      content
    );
  }

  @dispatch()
  selectTab(index: number) {
    return prefixActionCreator(this.prefix)(this.actions.selectTab)(index);
  }

  @dispatch()
  removeAllTabs() {
    return prefixActionCreator(this.prefix)(this.actions.removeAllTabs)();
  }

  @dispatch()
  closeTab(index) {
    return prefixActionCreator(this.prefix)(this.actions.removeTab)(index);
  }
}
