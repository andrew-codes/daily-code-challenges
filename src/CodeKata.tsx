import React, { FC } from 'react'
import loadable from '@loadable/component'
import { Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import { Mdx } from './Mdx'

type Category = 'react' | 'javascript' | 'typescript'

type Props = {
  date: Date
  name: string
  category: Category
}

const ReactCodeKata: FC<Props> = ({ category, date, name }) => {
  const kataId = name.replace(/\s+/g, '-').toLowerCase()
  const ReadMe = loadable(() =>
    import(`./katas/${kataId}/README.mdx`).then(content => (): FC => (
      <Mdx>{content}</Mdx>
    ))
  )
  const Demo = loadable(() => import(`./katas/${kataId}/index.tsx`))

  return (
    <Switch>
      <Route exact={true} path="/">
        <Link to={`/${kataId}`}>
          {category}: {name} - {date.toLocaleDateString()}
        </Link>
      </Route>
      <Route path="/:kataId">
        <aside>
          <Link to="/">Back to Katas List</Link>
        </aside>
        <article>
          <header>
            <h1>{name}</h1>
            <p>completed on {date.toLocaleDateString()}</p>
            <p>Category: {category}</p>
          </header>
          <section>
            <h2>Read Me</h2>
            <ReadMe />
          </section>
          {category === 'react' && (
            <section>
              <h2>Demo</h2>
              <Demo />
            </section>
          )}
        </article>
      </Route>
    </Switch>
  )
}
export default ReactCodeKata
