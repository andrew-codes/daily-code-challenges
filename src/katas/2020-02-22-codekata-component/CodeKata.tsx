import React, { FC } from 'react'
import loadable from '@loadable/component'
import { Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import { getDatePrefix } from './getDatePrefix'

type Category = 'react' | 'javascript' | 'typescript'

type Props = {
  date: Date
  name: string
  category: Category
  pathPrefix?: string
}

const CodeKata: FC<Props> = ({ category, date, name, pathPrefix }) => {
  const datePrefix = getDatePrefix(date)
  const kataDirectoryName = `${datePrefix}-${name
    .replace(/\s+/g, '-')
    .toLowerCase()}`
  const ReadMe = loadable(() =>
    import(`../${kataDirectoryName}/README.mdx`)
  )
  const Demo = loadable(() => import(`../${kataDirectoryName}/index.tsx`))

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
    </div>
  )
}
CodeKata.defaultProps = {
  pathPrefix: '',
} as Partial<Props>

export default CodeKata
