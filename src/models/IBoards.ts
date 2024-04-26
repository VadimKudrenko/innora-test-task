import { IRepoIssue } from "./IRepoIssue"

export interface IBoards {
  id: number,
  title: string,
  issues: IRepoIssue[]
}