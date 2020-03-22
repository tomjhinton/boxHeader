import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'


import Main from './components/Main'
import 'bulma'
import './style.scss'

class App extends React.Component {
  constructor(){
    super()

    this.state = {
    }
  }

  componentDidMount() {
  
  }



  render() {
    return (

      <Router>
        <main>

          <Switch>
            <Route path="/" component={Main} />


          </Switch>

        </main>

      </Router>


    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
