import { AnyAction } from 'redux';
import { TabActions } from './actions';

interface ITabState {
  title: string;
  content: string;
}

export interface ITabsState {
  active: number;
  tabs: ITabState[];
}

const initState: ITabsState = {
  tabs: [],
  active: 0
};

export function tabsReducer(
  lastState: ITabsState = initState,
  action: AnyAction
): ITabsState {
  switch (action.type) {
    case TabActions.ADD_TAB:
      return Object.assign({}, lastState, {
        tabs: [...lastState.tabs, action.payload],
        active: lastState.tabs.length
      });

    case TabActions.REMOVE_TAB:
      return Object.assign({}, lastState, {
        tabs: lastState.tabs.filter((tab, i) => i !== action.payload),
        active:
          lastState.tabs.length - 1 === lastState.active
            ? lastState.tabs.length - 2
            : lastState.active
      });

    case TabActions.REMOVE_ALL:
      return Object.assign({}, lastState, {
        active: 0,
        tabs: []
      });

    case TabActions.SELECT_TAB:
      return Object.assign({}, lastState, {
        active: action.payload
      });

    default:
      return lastState;
  }
}
