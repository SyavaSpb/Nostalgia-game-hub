import {Switch, Route} from 'react-router-dom'
import MainPage from './Pages/Main/MainPage.js'
import SnakePage from './Pages/Snake/SnakePage.js'

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact>
        <MainPage />
      </Route>
      <Route path="/snake" exact>
        <SnakePage />
      </Route>
    </Switch>
  )
}
