import React from 'react'

import ProducerList from './ProducerList'


export default class ProducerSearch extends React.Component {
  constructor() {
      super()
  }
  render(){
            return(
              <div class='producerSearch'>

                      <div class="search_field" >
                          <input type="text"  placeholder="Búsqueda de productores..."></input>
                      </div>

                  <ProducerList />

              </div>
            )
  }

}
