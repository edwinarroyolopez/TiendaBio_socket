import React from 'react'

import Comment from './Comment'

export default class CommentList extends React.Component {
  constructor() {
      super()
            this.state = {
                none : []
         }
  }
  render(){

      let all_comments = this.props.data.map((comment) => {
            return(<div key={comment.id_comment.toString()}>
                          <Comment  author={comment.author_name} text={comment.text_comment} />
                          <button onClick={(e) => {this.props.onRemove(comment.id_comment)}}>Remove</button>
                    </div>)
      })

        return(
          <div class='commentList'>
              { all_comments }
          </div>
        )
  }

}
