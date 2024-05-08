// Write your code here
import './index.css'

const CommentItem = props => {
  const {commentsList, onToggleLike, onDeleteComment} = props
  const {id, name, comment, isLiked} = commentsList

  const onClickLiked = () => {
    onToggleLike(id)
  }

  const onClickDeleteComment = () => {
    onDeleteComment(id)
  }

  const isLikedImg = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  return (
    <li key={commentsList.id}>
      <h1>{name}</h1>
      <p>{comment}</p>
      <button type="button" onClick={onClickLiked} className="like-img">
        {isLikedImg}
      </button>
      <p>Like</p>
      <button type="button" className="del-icon" onClick={onClickDeleteComment} data-testid="delete">
        <img
          src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
          alt="delete"
          
        />
      </button>
    </li>
  )
}

export default CommentItem
