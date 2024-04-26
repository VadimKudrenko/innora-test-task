import { useState } from 'react'
import './CreateRepoForm.css'

import { IRepoIssue } from '../../../models/IRepoIssue'
import { IBoards } from '../../../models/IBoards'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

interface CreateRepoFormProps {
  addNewIssue: any;
  boards: IBoards[];
}

export default function CreateRepoForm({boards, addNewIssue }:CreateRepoFormProps) {
  const [issueTitle, setIssueTitle] = useState('');

  function createNewIssue(){
    const randomNumber = Number(new Date());
    const newIssue:IRepoIssue = {
      id: randomNumber,
      title: issueTitle,
      number: randomNumber,
      created_at: new Date(),
      closed_at: new Date(),
      comments: 0,
      user: {login: 'Test'},
    }

    const newBoards = boards.map((b:IBoards) => {
      if(b.title === 'All'){
        b.issues.splice(0, 0, newIssue)
      }
      return b
    })

    // const newBoards = boards.map((b:IBoards) => {
    //   if (b.id === selectBoard.id) {
    //     return selectBoard
    //   }
    //   if (b.id !== selectBoard.id) {
    //     return b
    //   }
    // })

    console.log(newBoards)
    addNewIssue(newBoards)
  }

  return (
    <>
      <div className='create-repo-form__title-wrapper'>
        <h4>Create New Issue</h4>
      </div>
      <div className='create-repo-form__wrapper'>
        <InputGroup className="mb-3 find-repo-form__input-group">
          <Form.Control
            placeholder="Title of new Issue"
            aria-label="Title of new Issue"
            aria-describedby="basic-addon2"
            onChange={(e) => setIssueTitle(e.target.value)}
            value={issueTitle}
          />
          <Button variant="outline-danger" id="button-addon2" onClick={()=> createNewIssue()}>
            Create
          </Button>
        </InputGroup>
      </div>
    </>
  )
}
