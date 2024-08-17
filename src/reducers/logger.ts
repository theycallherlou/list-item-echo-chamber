import { Reducer, ReducerAction, ReducerState } from 'react';

function logger<S, A>(reducer: Reducer<S, A>) {
  return (state: ReducerState<Reducer<S, A>>, action: ReducerAction<Reducer<S, A>>) => {
    console.info(`Before: ${state}`);
    console.info(`After: ${action}`);
    const newState = reducer(state, action);
    console.info(`New state: ${newState}`);
    return newState;
  }
}

export default logger
