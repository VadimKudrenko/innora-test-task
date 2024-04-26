import React from 'react'
import './KanbanBoardRepoPath.css'
import { IRepoData } from '../../../models/IRepoData'
import { AiFillStar } from 'react-icons/ai'

interface KanbanBoardRepoPathProps {
  repositoryData: IRepoData;
}

export default function KanbanBoardRepoPath({repositoryData}:KanbanBoardRepoPathProps) {
  
  const stargazersCounterRounding = (number:number) => {
    if (number >= 1000000) {
      return Math.floor(number / 1000000) + " M";
    } else if (number >= 1000) {
      return Math.floor(number / 1000) + " K";
    } else {
      return number
    }
  }
  
  const repositoryOwnerUrl = (url: string) => {
    const resultUrl = url.split('/');
    resultUrl.splice(-1, 1);
    return resultUrl.join('/')
  }

  const repositoryOwner = (url: string) => {
    return url.split('/').splice(-2, 1)
  }

  const repositoryName = (url:string) => {
    return url.split('/').splice(-1, 1)
  }

  return (
    <div className='kanban-board-repo-path-wrapper'>
      {
        repositoryData.html_url 
        ?
        <>
          <a className='kanban-board-repo-path__text kanban-board-repo-path__link' href={repositoryOwnerUrl(repositoryData.html_url)}>{repositoryOwner(repositoryData.html_url)}</a>
          <p className='kanban-board-repo-path__text kanban-board-repo-path__text--arrow'>{' > '}</p>
          <a className='kanban-board-repo-path__text kanban-board-repo-path__link' href={repositoryData.html_url}>{repositoryName(repositoryData.html_url)}</a>
        </>
        :
        <></>
      }

      {
        repositoryData.stargazers_count 
        ?
        <div className='kanban-board-repo-path__stargazers-wrapper'>
          <AiFillStar className='kanban-board-repo-path__stargazers-icon'/>
          <p className='kanban-board-repo-path__text kanban-board-repo-path__text--stargazers'>{stargazersCounterRounding(repositoryData.stargazers_count)} stars</p>
        </div>
        :
        <></>
      }

    </div>

  )
}
