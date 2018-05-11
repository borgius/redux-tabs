import { Injectable } from '@angular/core';
import { AnyAction } from 'redux';

@Injectable()
export class TabActions {
  static ADD_TAB = 'ADD_TAB';
  static REMOVE_ALL = 'REMOVE_ALL';
  static REMOVE_TAB = 'REMOVE_TAB';
  static SELECT_TAB = 'SELECT_TAB';

  addTab(title, content): AnyAction {
    return { type: TabActions.ADD_TAB, payload: { title, content } };
  }

  selectTab(index: number): AnyAction {
    return { type: TabActions.SELECT_TAB, payload: index };
  }

  removeTab(index: number): AnyAction {
    return { type: TabActions.REMOVE_TAB, payload: index };
  }

  removeAllTabs(): AnyAction {
    return { type: TabActions.REMOVE_ALL };
  }
}
