import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './Header/Header'
import Profile from './Profile/Profile'
import Book from './Book/Book'

import './index.css'

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/" component={Book} />
      </Switch>
    </Router>
  )
}
export default App
