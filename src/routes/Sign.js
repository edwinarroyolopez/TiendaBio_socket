import $ from 'jquery'
import React from 'react'
import Reflux from 'reflux'
import ReactMixin from 'react-mixin'

import CommentBox from '../components/CommentBox'
import CommentStore from '../stores/CommentStore'
import CommentActions from '../actions/CommentActions'

@ReactMixin.decorate(Reflux.connect(CommentStore, 'comments'))
export default class Sign extends React.Component {
  constructor() {
    super()
  }

  componentDidMount(){
    CommentActions.fetchComments()
  }

  onSubmitSendComment(e){
    e.preventDefault
    let form_data = $(e.target).serializeArray();
    let comment ={
      id_comment:form_data[2].value,
      author_name:form_data[0].value,
      text_comment:form_data[1].value
    }
    CommentActions.sendSign(comment);
  }/* submit comment */
  onRemoveComment(id_comment){
    console.log('Id comment: ' +id_comment);

    var self = this;

    let all_comments = this.state.comments;

    let comment = all_comments.find(function(comment){
      return comment.id_comment === id_comment
    });

    CommentActions.removeComment(id_comment);

    console.log('Comment for remove: ' + JSON.stringify(comment));

    all_comments.splice(all_comments.indexOf(comment),1);

    self.setState({
      comments : all_comments
    })

  }/* remove comment */
  render(){

    console.log('Comments: '+JSON.stringify(this.state.comments));

    if(!this.state.comments){
      return(
        <div id="app">
          <div>Loading comments...</div>
        </div>
      )
    }else{
      return(
        <div id="app">
          <div class='sign'>
            <CommentBox onSubmit={this.onSubmitSendComment.bind(this)} onRemove={ this.onRemoveComment.bind(this) } data={this.state.comments} />
          </div>
        </div>
      )
    }

  }

}
