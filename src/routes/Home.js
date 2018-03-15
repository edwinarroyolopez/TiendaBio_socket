import React from 'react'
import { Link } from 'react-router-dom'

export default class Home extends React.Component {
  constructor() {
    super()
  }

  componentDidMount(){

  }
  

  render(){
    return(
      <div id="app">
        <div class='home'>
          <h1> React Zeroedprogrammer, pasa y firma :D!</h1>
          <Link to='sign'>Firma ahora cuate! :D</Link>
        </div>
      </div>
    )
  }

}
