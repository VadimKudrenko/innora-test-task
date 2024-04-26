import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// import {repoIssuesReducer} from "./RepoIssuesReducer"
import findRepoFormReducer  from './reducers/FindRepoForm/FindRepoFormSlice'
// import counterReducer  from '../components/findRepoForm/FindRepoFormSlice'

export const store = configureStore({
  reducer: {
    repository: findRepoFormReducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
