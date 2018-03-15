import Reflux from 'reflux'
import io from 'socket.io-client'

import ProducerActions from '../actions/ProducerActions.js'

let ProducerStore = Reflux.createStore({
    listenables: [ProducerActions],
    init: function(){
            this.socket = io('http://localhost:3000')
            this.socket.on('data', (data) => {
                        this.trigger(data)
            })

    },
    fetchProducer: function(parameters){
          this.socket.emit('read')
    },
    createProducer: function(comment){
          this.socket.emit('sign',comment)
    },
    updateProducer: function(id_comment){
          this.socket.emit('remove',id_comment)
    },
    changeStateProducer: function(id_comment){
          this.socket.emit('remove',id_comment)
    },
    removeProducer: function(id_comment){
          this.socket.emit('remove',id_comment)
    }
})

export default ProducerStore
