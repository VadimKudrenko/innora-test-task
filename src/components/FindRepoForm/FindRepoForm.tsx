import { useState } from 'react'
import './FindRepoForm.css';
import { useAppDispatch } from '../../hooks/hooks';
import { fetchIssues, fetchRepoStargazers} from '../../store/reducers/FindRepoForm/ActionCreators'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function FindRepoForm() {
  const [repoUrl, setRepoUrl] = useState('');
  const dispatch = useAppDispatch();

  function getData(url: string) {
    const repoPathArr = url.split('/');
    const repoOwner = repoPathArr[repoPathArr.length - 2];
    const repoName = repoPathArr[repoPathArr.length - 1];

    // send request by template
    // https://api.github.com/repos/OWNER/REPO/issues
    const issuesUrl = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues';
    dispatch(fetchIssues(issuesUrl));
    
     // https://api.github.com/repos/OWNER/REPO
    const repositoryUrl = 'https://api.github.com/repos/' + repoOwner + '/' + repoName;
    dispatch(fetchRepoStargazers(repositoryUrl))
  }

  return (
    <div className='find-repo-form'>
      <InputGroup className="mb-3 find-repo-form__input-group">
        <Form.Control
          placeholder="Enter repo URL"
          aria-label="Enter repo URL"
          aria-describedby="basic-addon2"
          onChange={(e) => setRepoUrl(e.target.value)}
          value={repoUrl}
        />
        <Button variant="outline-primary" id="button-addon2" onClick={()=> getData(repoUrl)}>
          Load issues
        </Button>
      </InputGroup>
    </div>
  )
}
