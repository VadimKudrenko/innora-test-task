import { useEffect, useState } from 'react'
import './KanbanBoard.css'

import { useAppSelector } from '../../hooks/hooks';
import { IBoards } from '../../models/IBoards'
import { IRepoIssue } from '../../models/IRepoIssue'


import KanbanBoardRepoPath from './KanbanBoardRepoPath/KanbanBoardRepoPath'
import CreateRepoForm from './CreateRepoForm/CreateRepoForm'
import KanbanBoardItem from './KanbanBoardItem/KanbanBoardItem'

export default function KanbanBoard() {
  const repositoryData = useAppSelector(state => state.repository.repositoryData)
  if  (repositoryData.html_url !== undefined) {
    sessionStorage.setItem("currentRepoSessionStore", JSON.stringify(repositoryData.html_url));
  }

  const currentRepoSessionStorageToParse = sessionStorage.getItem('currentRepoSessionStore');
  const repositoryIssues = useAppSelector(state => state.repository.issues)

  const inititalIssues:IRepoIssue[] = [
    {id:1, number:1, title:'test title', created_at: new Date(), closed_at: new Date(), comments: 0, user:{login: 'testUser1'} },
    {id:2, number:2, title:'test title', created_at: new Date(), closed_at: new Date(), comments: 0, user:{login: 'testUser2'} },
  ]

  const [boards, setBoards] = useState<IBoards[]>([
    {id: 1, title: 'All', issues: inititalIssues},
    {id: 2, title: 'Deleted', issues: []},
  ])

  useEffect(()=>{
    // There are 3 scenarios:
    // 1. When the user is search a repository which was changed
    // 2. When the user is search a repository which hasn't been changed
    // 3. When user reload the page and other situatuions

    // If repo URL exist in sessionStorage, 
    // get data of this repositry with changes from sessionStorage, and put them in boards.
    // In other way, get data of repository from gitHub api, and then put it in board.
    // And if user make changes in some repositories and refresh or close page,
    // board will display a last found and changed repository.


    if (repositoryData.html_url !== undefined && sessionStorage.getItem(repositoryData.html_url) !== null)  {
      sessionStorage.getItem(repositoryData.html_url)
      if(currentRepoSessionStorageToParse !== null) {
        const currentRepoSessionStorage = JSON.parse(currentRepoSessionStorageToParse);
        // .replaceAll used becouse sessionStorage got a string with unnecessary ""
        const boardsSessionStorageToParse = sessionStorage.getItem(currentRepoSessionStorage.replaceAll('"', ''));
        if (boardsSessionStorageToParse) {
          const boardsSessionStorage = JSON.parse(boardsSessionStorageToParse)
          setBoards(boardsSessionStorage)
        }
      } 
    } else if (repositoryIssues.length !== 0 && repositoryData.html_url && sessionStorage.getItem(repositoryData.html_url) === null) {
      const toDoIssuesBoard = repositoryIssues.filter(issue => issue.assignee === null && issue.closed_at === null)
      // const inProgressIssuesBoard = repositoryIssues.filter(issue => issue.assignee !== null)
      setBoards([
        {id: 1, title: 'All', issues: toDoIssuesBoard},
        {id: 2, title: 'Deleted', issues: []},
      ])
    } else {
      if(currentRepoSessionStorageToParse !== null) {
        const currentRepoSessionStorage = JSON.parse(currentRepoSessionStorageToParse);
        const boardsSessionStorageToParse = sessionStorage.getItem(currentRepoSessionStorage);
        if (boardsSessionStorageToParse) {
          const boardsSessionStorage = JSON.parse(boardsSessionStorageToParse)
          setBoards(boardsSessionStorage)
        }
      } 
    }
  },[repositoryIssues, repositoryData])

  function kanbanItemOnDrop(newBoards: IBoards[]) {
    setBoards(newBoards)
    
    // get update for sessionStorage
    if (repositoryData.html_url){
      sessionStorage.setItem(repositoryData.html_url, JSON.stringify(newBoards));
    } else if (currentRepoSessionStorageToParse) {
        //.replaceAll used becouse sessionStorage got a string with unnecessary ""
      sessionStorage.setItem(currentRepoSessionStorageToParse.replaceAll('"', ''), JSON.stringify(newBoards));
    }
  
  }

  // for drag&drop
  const [draggBoard, setDraggBoard] = useState<IBoards>({
    id: 0,
    title: '',
    issues: []
  })
  const [draggIssue, setDraggIssue] = useState<IRepoIssue>({
    id: 0,
    number: 0,
    title: '',
    created_at: new Date(),
    closed_at: new Date(),
    assignee: '',
    comments: 0,
    state: '',
    user: {login: ''},
  })

  function setDraggValue(currentBoard: IBoards, currentIssue: IRepoIssue) {
    setDraggBoard(currentBoard)
    setDraggIssue(currentIssue)
  }

  function dragOverHandler(e:any) {
    e.preventDefault();
  }

  function dropIssueHandler(e:any, board:IBoards) {
    if(board.issues.length === 0){
      board.issues.push(draggIssue)
      const currentIndex = draggBoard.issues.indexOf(draggIssue)
      draggBoard.issues.splice(currentIndex, 1);
  
      const newBoards = boards.map(b => {
        if (b.id === board.id) {
          return board
        }
        if (b.id === draggBoard.id) {
          return draggBoard
        }
        return b
      })
      setBoards(newBoards)

      // get update for sessionStorage
      if (repositoryData.html_url){
        sessionStorage.setItem(repositoryData.html_url, JSON.stringify(newBoards));
      } else if (currentRepoSessionStorageToParse) {

        //.replaceAll used becouse sessionStorage got a string with unnecessary ""
        sessionStorage.setItem(currentRepoSessionStorageToParse.replaceAll('"', ''), JSON.stringify(newBoards));
      }
    } 
  }

  return (
    <div className='kanban-board-wrapper'>
      <CreateRepoForm boards={boards} addNewIssue={kanbanItemOnDrop} />
      <KanbanBoardRepoPath repositoryData={repositoryData} />
  
      <div className='kanban-board-wrapper-inner'>
        {boards.map((board) => 
          <div 
            className='kanban-board__board'
            key={board.id} 
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropIssueHandler(e, board)}
          >
            <h3>{board.title}</h3>
            <div className='kanban-board__board-list'>
              {board.issues.map((issue) => <KanbanBoardItem 
                key={issue.id} 
                boards={boards} 
                board={board} 
                issue={issue} 
                onIssueDrop={kanbanItemOnDrop}
                setDraggValue={setDraggValue} 
                draggIssue={draggIssue}
                draggBoard={draggBoard}
              />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
