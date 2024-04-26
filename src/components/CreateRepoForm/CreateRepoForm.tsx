import { useState } from 'react'

import './CreateRepoForm.css'

import RepoForm from './RepoForm';


export default function CreateRepoForm() {
  return (
    <>
      <div className='create-repo-form__title-wrapper'>
        <h3>Create New Issue</h3>
      </div>
      <RepoForm />
    </>
  )
}
