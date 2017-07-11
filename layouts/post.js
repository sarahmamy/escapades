import Page from './main'
import PropTypes from 'prop-types'
import Link from 'next/link'

const Post = ({ children }) => (
  <Page>
    <Link href='/'><a className='link'>Home</a></Link>
    <article>
      { children }
    </article>
    <style jsx>{`
      article {
        max-width: 650px;
        margin: auto;
        font-size: 14px;
      }
    `}</style>
    <style jsx global>{`
      body {
        width: 100%;
        overflow-x: hidden;
      }
    `}</style>
  </Page>
)

Post.propTypes = {
  children: PropTypes.array
}

export default Post
