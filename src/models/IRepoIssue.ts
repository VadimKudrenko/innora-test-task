type UserRepoIssue = {
  login: string
}

export interface IRepoIssue {
  id?: number;
  number?: number;
  title?: string;
  created_at: Date;
  closed_at: Date;
  assignee?: string;
  comments?: number;
  state?: string;
  user: UserRepoIssue;
}