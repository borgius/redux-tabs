import { NgRedux, select } from '@angular-redux/store';
import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import * as faker from 'faker';
import { prefixActionCreator } from 'mindfront-redux-utils';
import { AppActions } from './actions';
import { IAppState } from './store';
import { TabActions } from './tabs/actions';
import { TabsComponent } from './tabs/tabs.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tabsRef: TabsComponent;
  @select() populated;
  @ViewChild('tabsContainer', { read: ViewContainerRef })
  tabsContainer;
  @ViewChild('tabsContainer2', { read: ViewContainerRef })
  tabsContainer2;

  title = 'app';
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private tabActions: TabActions,
    private resolver: ComponentFactoryResolver
  ) {}
  ngOnInit() {}
  populateTabs() {
    this.tabsRef = this.createTabs(this.tabsContainer, ['myTabs']);
    this.ngRedux.dispatch({ type: AppActions.POPULATE });
  }
  private createTabs(container, basePath) {
    container.clear();
    const factory = this.resolver.resolveComponentFactory(TabsComponent);
    const tabsRef = this.tabsContainer.createComponent(factory);
    tabsRef.instance.basePath = basePath;
    return tabsRef;
  }

  getLastTabNumber(prefix) {
    const tab = this.ngRedux.getState()[prefix].tabs.slice(-1)[0];
    return parseInt(tab ? tab.title.substr(-1) : 0, 10);
  }
  addTab(prefix) {
    this.ngRedux.dispatch(
      prefixActionCreator(prefix)(this.tabActions.addTab)(
        `title${this.getLastTabNumber(prefix) + 1}`,
        this.randomHTML()
      )
    );
  }
  randomHTML() {
    return `
      <h2>${faker.lorem.sentence()}</h2>
      <p>${faker.lorem.paragraph()}</p>
      <strong>${faker.name.findName()}</strong>
    `;
  }
}
