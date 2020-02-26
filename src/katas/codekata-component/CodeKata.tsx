import React, { FC } from 'react'
import loadable from '@loadable/component'
import { Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'

type Category = 'react' | 'javascript' | 'typescript'

type Props = {
  date: Date
  name: string
  category: Category
  pathPrefix?: string
}

const CodeKata: FC<Props> = ({ category, date, name, pathPrefix }) => {
  const kataDirectoryName = name.replace(/\s+/g, '-').toLowerCase()
  const ReadMe = loadable(() => import(`../${kataDirectoryName}/README.mdx`))

  return (
    <div>
      <Switch>
        <Route exact={true} path={`${pathPrefix}/`}>
          <Link to={`${pathPrefix}/${kataDirectoryName}`}>
            {category}: {name} -{' '}
            <time dateTime={date.toLocaleDateString()}>
              {date.toLocaleDateString()}
            </time>
          </Link>
        </Route>
        <Route exact={true} path={`${pathPrefix}/${kataDirectoryName}`}>
          <aside>
            <Link to="/">Back to Katas List</Link>
          </aside>
          <article>
            <header>
              <h1>{name}</h1>
              <p>
                completed on{' '}
                <time dateTime={date.toLocaleDateString()}>
                  {date.toLocaleDateString()}
                </time>
              </p>
              <p>Category: {category}</p>
              <p>
                <a
                  href={`https://github.com/andrew-codes/daily-code-challenges/tree/master/src/katas/${kataDirectoryName}`}
                >
                  link to code on GitHub
                </a>
              </p>
            </header>
            <section>
              <ReadMe />
            </section>
          </article>
        </Route>
      </Switch>
    </div>
  )
}
CodeKata.defaultProps = {
  pathPrefix: '',
} as Partial<Props>

export default CodeKata
