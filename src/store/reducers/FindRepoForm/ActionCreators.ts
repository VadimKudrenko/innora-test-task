import axios from "axios";
import {IRepoIssue} from "../../../models/IRepoIssue";
import {createAsyncThunk} from "@reduxjs/toolkit";


export const fetchIssues = createAsyncThunk(
  'issues/fetchAll',
  async (url:string, thunkAPI) => {
      try {
          const response = await axios.get<IRepoIssue[]>(url)
          return response.data;
      } catch (e) {
          return thunkAPI.rejectWithValue("Failed to load issues")
      }
  }
)

export const fetchRepoStargazers = createAsyncThunk(
  'issues/fetchfetchRepoStargazers',
  async (url:string, thunkAPI) => {
      try {
          const response = await axios.get<IRepoIssue[]>(url)
          return response.data;
      } catch (e) {
          return thunkAPI.rejectWithValue("Failed to load Stargazers")
      }
  }
)

