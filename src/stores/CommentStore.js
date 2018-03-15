import Reflux from 'reflux'
import io from 'socket.io-client'

import CommnentActions from '../actions/CommentActions.js'

let CommentStore = Reflux.createStore({
    listenables: [CommnentActions],
    init: function(){
            this.socket = io('http://localhost:3000')
            this.socket.on('data', (data) => {
                        this.trigger(data)
            })

    },
    fetchComments: function(){
          this.socket.emit('read')
    },
    sendSign: function(comment){
          this.socket.emit('sign',comment)
    },
    removeComment: function(id_comment){
          this.socket.emit('remove',id_comment)
    }
})

export default CommentStore
