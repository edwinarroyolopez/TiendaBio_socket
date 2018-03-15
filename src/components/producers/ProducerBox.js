import React from 'react'

import ProducerSearch from './ProducerSearch'


export default class ProducerBox extends React.Component {
  constructor() {
      super()
  }
  on_add_Producer(){
        console.log("Debería llamar formulario para almacenar un nuevo productor");
  }
  render(){
            return(
              <div class='producerBox'>

                  <div class="add_element" id="btn_add_producer" onClick={this.on_add_Producer.bind(this)}>
                      <div class="plus" >
                          <div class="label">+</div>
                      </div>
                      <div class="description">
                          <div class="text">Nuevo productor</div>
                      </div>
                  </div>
                  <ProducerSearch />
              </div>
            )
  }

}
