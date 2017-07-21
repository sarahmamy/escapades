import PropTypes from 'prop-types'
import Link from 'next/link'

const PostInfo = ({ id, date, title, highlight, header }) => {
  const polygon = '30,0 330,0 330,170 190,170 180,180 170,170 30,170'

  return (
    <Link prefetch href={`/${new Date(date).getFullYear()}/${id}`}>
      <div
        className='post flex-child relative h240 w360 round cursor-pointer'
        onMouseEnter={highlight}
        onClick={highlight}
      >
        <svg height='220' width='360'>
          <defs>
            <pattern id={'img' + id} patternUnits='userSpaceOnUse' height='180' width='360'>
              <image x='0' y='0' height='180' width='360' xlinkHref={header} preserveAspectRatio='xMinYMin slice' />
            </pattern>
            <linearGradient id={'grad' + id} x1='0%' y1='100%' x2='100%' y2='0%'>
              <stop offset='0%' style={{stopColor: '#c63a22', stopOpacity: 0.5}} />
              <stop offset='100%' style={{stopColor: '#e2a541', stopOpacity: 0.2}}/>
            </linearGradient>
          </defs>
          <polygon points={polygon} fill={`url(#${'img' + id})`} />
          <polygon className='filter' points={polygon} fill={`url(#${'grad' + id})`} />
          <line x1='0' y1='190' x2='360' y2='190' style={{stroke: '#777d9b', strokeWidth: 2}}/>
          <circle cx='180' cy='190' r='5' style={{stroke: '#ffffff', strokeWidth: 2, fill: '#c63a22'}}/>
          <text className='title' x='42' y='150' fill='#ffffff'>{title.toUpperCase()}</text>
          <text className='date' x='180' y='212' fill='#777d9b' textAnchor='middle' >{date}</text>
        </svg>

        <style jsx global>{`
          .title {
            font-size: 25px;
            line-height: 35px;
            font-family: 'Passion One', sans-serif;
            text-shadow: 4px 4px rgba(48, 50, 64, 0.5);
          }

          .filter {
            opacity: 1;
            transition: opacity 0.7s ease-out;
          }

          .post {
            background-size: cover;
          }

          .post:hover .filter{
            opacity: 0;
          }
        `}</style>
      </div>
    </Link>
  )
}

PostInfo.propTypes = {
  id: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string,
  highlight: PropTypes.func,
  header: PropTypes.string
}

export default PostInfo
