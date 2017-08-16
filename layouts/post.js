import React, {Component} from 'react'
import Page from './main'
import PropTypes from 'prop-types'
import Header from '../components/post/header'
import InfoSection from '../components/post/info-section'
import PhotoGallery from '../components/post/photo-gallery'
import Footer from '../components/post/footer'
import {StickyContainer, Sticky} from 'react-sticky'
import {CSSTransitionGroup} from 'react-transition-group'
import {findTrail} from '../helpers/trail-extractor'
import palette from '../styles/palette'

class Post extends Component {
  constructor (props) {
    super(props)
    this.state = {
      content: '',
      id: 0
    }
  }

  render () {
    return (
      <Page>
        <Header
          img={this.props.header}
          title={this.props.title}
          subtitle={this.props.subtitle}
          home={true}
          trail={this.props.trail}
        />
        <InfoSection
          trail={findTrail(this.props.trail)}
          jours={this.props.jours}
          tags={this.props.tags}
        />
        <div className='flex-parent flex-parent--row flex-parent--stretch-cross'>
          <StickyContainer className='flex-child' style={{minWidth: '50%', minHeight: '100%'}}>
            <Sticky>
              {({ style }) =>
              <div style={{...style, height: '100vh'}} ref={sidebar => { this.sidebar = sidebar }}>
                <CSSTransitionGroup
                  transitionName='smooth'
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={0}>
                  <div key='sidebar' id='sidebar' className='absolute h-full w-full'></div>
                  {
                    this.state.content
                    ? <div key={this.state.id} className='absolute h-full w-full z5'>{this.state.content}</div>
                    : null
                  }
                </CSSTransitionGroup>
              </div>}
            </Sticky>
          </StickyContainer>
          <article className='flex-child flex-child--grow py30'>
            {
              this.props.children.map((child, i) => React.cloneElement(child, {
                key: i,
                setContent: (content) => {
                  if (content !== this.state.content) this.setState({content, id: this.state.id + 1})
                }
              }))
            }
          </article>
        </div>
        <PhotoGallery photos={this.props.photos}/>
        <Footer />
        <style jsx>{`
          article {
            font-size: 18px;
            color: ${palette.grisClair};
            background-color: ${palette.bleuNuit};
          }

          @media screen and (min-width: 500px) {
            article {
              padding: 0px 60px 0px 60px;
            }
          }

          @media screen and (max-width: 500px) {
            article {
              padding: 0px 18px 0px 18px;
            }
          }

          .smooth-enter {
            opacity: 0.01;
          }

          .smooth-enter.smooth-enter-active {
            opacity: 1;
            transition: opacity 500ms ease-in;
          }

          .smooth-leave {
            opacity: 1;
          }

          .smooth-leave.smooth-leave-active {
            opacity: 0.01;
            transition: opacity 500ms ease-in;
            transition-delay: 500ms
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
  }
}

Post.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  header: PropTypes.string,
  children: PropTypes.array,
  trail: PropTypes.object,
  photos: PropTypes.array,
  jours: PropTypes.string,
  tags: PropTypes.array
}

export default Post
