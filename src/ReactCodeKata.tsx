import React, { FC } from 'react'
import uuid from 'uuid/v1'
import { Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'

type Props = {
  children: React.ReactNode
  date: Date
  description: React.ReactNode
  name: string
}

const ReactCodeKata: FC<Props> = ({ children, date, description, name }) => {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Link to={`/${uuid()}`}>
          {name} - {date.toLocaleDateString()}
        </Link>
      </Route>
      <Route path="/:kataId">
        <aside>
          <Link to="/">Back to Katas List</Link>
        </aside>
        <article>
          <header>
            <h1>{name}</h1>
            <sub>completed on {date.toLocaleDateString()}</sub>
          </header>
          <section>{description}</section>
          <section>{children}</section>
        </article>
      </Route>
    </Switch>
  )
}
export default ReactCodeKata
