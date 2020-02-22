import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CodeKata from '../katas/2020-03-22-codekata-component/CodeKata'
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
          date={new Date(2020, 2, 22)}
        />
      </div>
    </Router>
  )
}
