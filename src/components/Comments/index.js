import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {formatDistanceToNow} from 'date-fns'
import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here

class Comments extends Component {
  state = {name: '', comment: '', commentsList: [], count: 0}

  onClickChangeName = event => {
    this.setState({name: event.target.value})
  }

  onClickChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  onAddCommentAndName = event => {
    event.preventDefault()
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const {name, comment,  count} = this.state

    if (name.trim() !== '' && comment.trim() !== '') {
      const newComments = {
        id: uuidv4(),
        name,
        comment,
        date: new Date(),
        isLiked: false,
        initialClassName: initialBackgroundColorClassName,
      }
      this.setState(prevState => ({
        commentsList: [...prevState.commentsList, newComments],
        count: count + 1,
        name: '',
        comment: '',
      }))
    }
  }

  onToggleLike = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachLike => {
        if (id === eachLike.id) {
          return {...eachLike, isLiked: !eachLike.isLiked}
        }
        return eachLike
      }),
    }))
  }

  onDeleteComment = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.filter(
        eachComment => eachComment.id !== id,
      ),
      count: prevState.count - 1,
    }))
  }

  render() {
    const {name, comment, commentsList, count} = this.state
    return (
      <div className="bg-container">
        <div className="profile-section-container">
          <div>
            <h1 className="main-heading">Comments</h1>
            <p>Say something about 4.0 Technologies</p>
            <form
              className="inputContainer"
              onSubmit={this.onAddCommentAndName}
            >
              <input
                placeholder="Your Name"
                value={name}
                onChange={this.onClickChangeName}
              />

              <textarea
                placeholder="Your Comment"
                rows="15"
                cols="20"
                onChange={this.onClickChangeComment}
                value={comment}
              >
                {comment}
              </textarea>
              
                <button type="submit" className="button">
                  Add Comment
                </button>
              
            </form>
          </div>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="comments"
            />
          </div>
        </div>
        <hr />
        <div className="count-container">
          <p className="count">{count}</p>
          <p>Comments</p>
        </div>
        <ul>
          {commentsList.map(eachComment => (
            <CommentItem
              key={eachComment.id}
              eachComment={eachComment}
              onToggleLike={this.onToggleLike}
              onDeleteComment={this.onDeleteComment}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
