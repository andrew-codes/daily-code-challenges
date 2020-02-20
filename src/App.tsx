import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CodeKata from './CodeKata'
import './styles.css'

export default function App() {
  return (
    <Router>
      <div className="App">
        <Route exact={true} path="/">
          <header>
            <h1>List of Katas</h1>
          </header>
        </Route>
        <CodeKata category="react" name="Test" date={new Date(2020, 2, 19)} />
      </div>
    </Router>
  )
}
