import { AnyAction, combineReducers } from 'redux';
import { AppActions } from './actions';
import { ITabsState, tabsReducer } from './tabs/store';

export interface IAppState {
  myTabs: ITabsState;
  myTabs2: ITabsState;
  populated: boolean;
}

export const INITIAL_STATE: IAppState = {
  myTabs: {
    active: 0,
    tabs: [
      { title: 'title1', content: 'content1' },
      { title: 'title2', content: 'content2' }
    ]
  },
  myTabs2: {
    active: 0,
    tabs: [
      { title: 'title3', content: '<b>content3</b>' },
      { title: 'title4', content: 'content4' },
      { title: 'title5', content: 'content5' }
    ]
  },
  populated: false
};

export function populateReducer(
  lastState: boolean = false,
  action: AnyAction
): boolean {
  switch (action.type) {
    case AppActions.POPULATE:
      return true;

    default:
      return lastState;
  }
}

export function prefixReducer(prefix) {
  return reducer => {
    const result = (state, action) =>
      state === undefined ||
      (typeof action.type === 'string' && action.type.startsWith(prefix))
        ? reducer(state, {
            ...action,
            type: action.type.substring(prefix.length)
          })
        : state;

    return result;
  };
}

export const rootReducer = combineReducers<IAppState>({
  myTabs: prefixReducer('myTabs')(tabsReducer),
  myTabs2: prefixReducer('myTabs2')(tabsReducer),
  populated: populateReducer
});
