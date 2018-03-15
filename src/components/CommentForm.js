import React from 'react'

export default class CommentForm extends React.Component {
  constructor() {
      super()
  }
  render(){
        return(
          <form onSubmit={this.props.onSubmit} class='commentForm'>
              <input type="text" name="author" placeholder="Su nombre" />
              <input type="text" name="text" placeholder="Comment! :D" />
              <input type="hidden" name="id" value={ Date.now() }/>
              <input type="submit" name="author" value=" Enviar! :D" />
          </form>
        )
  }

}
