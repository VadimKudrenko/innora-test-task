import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IRepoIssue } from '../../../models/IRepoIssue'
import { IRepoData } from '../../../models/IRepoData'
import { fetchIssues, fetchRepoStargazers } from './ActionCreators';

interface RepoIssuesState {
  issues: IRepoIssue[];
  isLoading: boolean;
  error: string;
  repositoryData: IRepoData;
}

const initialState: RepoIssuesState = {
  issues: [],
  isLoading: false,
  error: '',
  repositoryData: {},
}

export const findRepoFormSlice = createSlice({
  name: 'findRepoForm',
  initialState,
  reducers: {
 
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.fulfilled.type, (state, action: PayloadAction<IRepoIssue[]>) => {
      state.isLoading = false;
      state.error = '';
      state.issues = action.payload;
      })
      .addCase(fetchIssues.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIssues.rejected.type, (state,  action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchRepoStargazers.fulfilled.type, (state, action: PayloadAction<IRepoData>) => {
        state.isLoading = false;
        state.error = ''
        state.repositoryData = action.payload;
      })
      .addCase(fetchRepoStargazers.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRepoStargazers.rejected.type, (state,  action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload
      });
  }

});

export default findRepoFormSlice.reducer