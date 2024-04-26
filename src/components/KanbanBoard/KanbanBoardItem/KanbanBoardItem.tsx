import React from 'react'
import './KanbanBoardItem.css'

import { IRepoIssue } from '../../../models/IRepoIssue'
import { IBoards } from '../../../models/IBoards'

import Button from 'react-bootstrap/Button';

import { AiOutlineDelete } from "react-icons/ai";
import { IoReturnDownBack } from "react-icons/io5";

import Card from 'react-bootstrap/Card';

interface KanbanBoardItemProps {
  issue: IRepoIssue;
  boards: IBoards[];
  board: IBoards;
  onIssueDrop: any;
  setDraggValue: any;
  draggIssue: IRepoIssue;
  draggBoard: IBoards;
}

export default function KanbanBoardItem({boards, board, issue, onIssueDrop, setDraggValue, draggIssue, draggBoard}:KanbanBoardItemProps) {
  // function calculate how much time has passed since issue was posted
  function getDaysPassed(date: Date) {
    const currentDate = new Date();
  
    const timeDiff = currentDate.getTime() - new Date(date).getTime(); 
    const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); 
    
    if(daysPassed <= 0) {
      return 'today'
    }

    const yearsPassed = Math.floor(daysPassed / 365);
    if (yearsPassed > 0) {
      return yearsPassed + " year ago";
    }

    const monthsPassed = Math.floor((daysPassed % 365) / 30);
    if (monthsPassed > 0) {
      return monthsPassed + " month ago";
    }

    return daysPassed + " days ago"
  }

  // functions for realise drag&drop feature
  function dragOverHandler(e: any) {
    e.preventDefault();
  }

  function dragLeaveHandler(e: any) {}

  function dragStartHandler(e: any, selectBoard: IBoards, selectIssue: IRepoIssue) {
    setDraggValue(selectBoard, selectIssue);
  }

  function dragEndHandler(e: any) {}

  // dragged issue add in list after selected issue
  function dragOnDropHandler(e: any, selectBoard: IBoards, selectIssue: IRepoIssue) {
    e.preventDefault();
    const currentIndex = draggBoard.issues.indexOf(draggIssue)
    draggBoard.issues.splice(currentIndex, 1);
    const dropIndex = selectBoard.issues.indexOf(selectIssue);
    selectBoard.issues.splice(dropIndex + 1, 0, draggIssue);
   
    const newBoards = boards.map(b => {
      if (b.id === board.id) {
        return selectBoard
      }
      if (b.id === draggBoard.id) {
        return draggBoard
      }
      return b
    })

    onIssueDrop(newBoards)
  }

  function getCurrentIssue(selectBoard: IBoards, selectIssue: IRepoIssue) {
  const getCurrentIssueIndex = selectBoard.issues.indexOf(selectIssue)
  selectBoard.issues.splice(getCurrentIssueIndex, 1);
  boards.map((b:IBoards) => {
    if(b.id !== selectBoard.id) {
      b.issues.splice(0,0,selectIssue)
    }
  })

  const newBoards = boards.map((b:IBoards) => {
    if (b.id === selectBoard.id) {
      return selectBoard
    }
    if (b.id !== selectBoard.id) {
      return b
    }
  })
    onIssueDrop(newBoards)
  }

  return (
  <Card 
    className='kanban-board-item' 
    draggable={true}
    onDragOver={(e) => dragOverHandler(e)}
    onDragLeave={(e) => dragLeaveHandler(e)}
    onDragStart={(e) => dragStartHandler(e, board, issue)}
    onDragEnd={(e) => dragEndHandler(e)}
    onDrop={(e) => dragOnDropHandler(e, board, issue)}
    >
    <Card.Body>
      <Card.Title className='kanban-board-item__title'>{issue.title}</Card.Title>
      <Card.Text className='kanban-board-item__text'>
        #{issue.number} opened {getDaysPassed(issue.created_at)}
      </Card.Text>
      <div className='kanban-board-item__subtitle-wrapper'>
        <Card.Subtitle className='kanban-board-item__subtitle'>{issue.user.login} | Comments: {issue.comments}</Card.Subtitle>
        {
          board.title === 'All'
          ?
            <Button variant='outline-dark' id='button-addon2' className='kanban-board-item__delete-btn' onClick={() => getCurrentIssue(board, issue)}>
              <AiOutlineDelete className='kanban-board-item__delete-btn-icon' />
            </Button>
          : 
            <Button variant='outline-dark' id='button-addon2' className='kanban-board-item__return-btn' onClick={() => getCurrentIssue(board, issue)}>
              <IoReturnDownBack className='kanban-board-item__return-btn-icon' />
            </Button>
        }
      </div>
    </Card.Body>
  </Card>
  )
}
