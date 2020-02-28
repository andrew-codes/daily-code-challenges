import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CodeKata from './katas/codekata-component/CodeKata'
import './styles.css'

export default function App() {
  return (
    <Router>
      <div className="App">
        <Route exact={true} path="/">
          <h1>List of Katas</h1>
        </Route>
        <CodeKata
          category="react"
          name="CodeKata Component"
          date={new Date(2020, 1, 22)}
        />
        <CodeKata
          category="react"
          name="SpacedGroup"
          date={new Date(2020, 1, 25)}
        />
        <CodeKata category="react" name="Tree" date={new Date(2020, 1, 28)} />
      </div>
    </Router>
  )
}
