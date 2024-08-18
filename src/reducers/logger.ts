import { Action } from '../lib/types';

const logger = (reducer: React.Reducer<any, Action>): React.Reducer<any, Action> => {
  return (state, action) => {
    console.groupCollapsed(`Action: ${action.type}`);
    console.log('%c Previous State:', 'color: #9E9E9E; font-weight: 700;', state);
    console.log('%c Action:', 'color: #00A7F7; font-weight: 700;', action);
    const newState = reducer(state, action);
    console.log('%c Next State:', 'color: #47B04B; font-weight: 700;', newState);
    console.groupEnd();
    return newState;
  };
};

export default logger;
