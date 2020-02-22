import React, { FC } from 'react'
import loadable from '@loadable/component'
import { Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import Mdx from './Mdx'
import { getDatePrefix } from './getDatePrefix'

type Category = 'react' | 'javascript' | 'typescript'

type Props = {
  date: Date
  name: string
  category: Category
  pathPrefix: string
}

const CodeKata: FC<Props> = ({ category, date, name, pathPrefix }) => {
  const datePrefix = getDatePrefix(date)
  const kataDirectoryName = `${datePrefix}-${name
    .replace(/\s+/g, '-')
    .toLowerCase()}`
  const ReadMe = loadable(() =>
    import(`../${kataDirectoryName}/README.md`).then(content => (): FC => (
      <Mdx>{content}</Mdx>
    ))
  )
  const Demo = loadable(() => import(`../${kataDirectoryName}/index.tsx`))

  return (
    <Switch>
      <Route exact={true} path={`${pathPrefix}/`}>
        <Link to={`${pathPrefix}/${kataDirectoryName}`}>
          {category}: {name} -{' '}
          <time dateTime={date.toLocaleDateString()}>
            {date.toLocaleDateString()}
          </time>
        </Link>
      </Route>
      <Route path={`${pathPrefix}/:kataId`}>
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
  )
}
CodeKata.defaultProps = {
  pathPrefix: '',
}
export default CodeKata
