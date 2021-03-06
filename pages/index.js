import React, { Component } from 'react'
import Head from 'next/head'
import Emoji from '../components/emoji'
import Page from '../layouts/main'
import PostInfo from '../components/index/post-info'
import Header from '../components/index/header'
import Footer from '../components/footer'
import Region from '../components/index/region'
import posts from '../posts'

class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      highlight: null
    }
  }

  render () {
    let headerImage = '/static/index/header-background.jpg'

    return (
      <Page>
        <Head>
          <title>escapades</title>
        </Head>
        <Header background={headerImage}/>

        <div className='main'>
          <div className='px18'>
            <div>
              <p className='intro txt-l-ml txt-m py30 align-center'>
                Nous avons décidé de vous faire partager nos escapades en randonnée sur ce site.
                <br />
                Vous pouvez retrouver l’index des différentes randos <a href='#geographical-section'><strong>géographiquement</strong></a> et <a href='#chronological-section'><strong>chronologiquement</strong></a>.
              </p>
            </div>

            <hr/>

            <div id='geographical-section'>
              <div className='py24'>
                <div className='px18-ml pb18'>
                  <h2 className='tournesol pt12 txt-xl txt-bold'><Emoji name='earth-africa'/> Des deux côtés de l’Atlantique</h2>
                  <p className='pt12'>
                    Voilà un aperçu de nos randos dans les différentes régions du globe, réparties par parc ou chaîne de montagnes.
                    <br />
                    Cliquez sur l’une d’entre elles pour en savoir plus.
                  </p>
                </div>
              </div>
              <div className='px18-ml pb24'>
                {this.regions()}
              </div>
            </div>

            <hr/>

            <div id='chronological-section'>
              <div className='py24'>
                <div className='px18 pb18'>
                  <h2 className='tournesol pt12 txt-xl txt-bold'><Emoji name='clock230'/> Sur les sentiers depuis 2012</h2>
                  <p className='pt12'>
                    Vous pouvez retrouver ci-dessous les mêmes randonnées que dans la précédente section, cette fois-ci ordonnées chronologiquement.
                    <br />
                    Cliquez sur une randonnée pour en lire l’histoire.
                  </p>
                </div>
                <div className='pt30 flex-parent flex-parent--row flex-parent--center-main flex-parent--wrap'>
                  {
                    posts
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .map(({ id, date, title, park, coords, header, url }) => (
                        <PostInfo
                          id={id}
                          key={id}
                          date={date}
                          title={title}
                          subtitle={park}
                          header={header}
                          url={url}
                        />
                      ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer
          prefooter={true}
          cta='Vous ne savez pas quelle rando choisir ? Commencez par l’ascension de Mitchell Peak'
          url='/2017/kings-canyon'
          quote='La dernière lignée d’arbres laisse apparaître un gigantesque pierrier et un névé. Le sommet est en haut...'
        />
      </Page>
    )
  }

  regions () {
    var hierarchy = {}
    posts.forEach(post => {
      if (!hierarchy[post.region]) hierarchy[post.region] = {}
      if (!hierarchy[post.region][post.park]) hierarchy[post.region][post.park] = []

      hierarchy[post.region][post.park].push(post)
    })

    return Object.keys(hierarchy).map((region, i) => <Region key={i} name={region} parks={hierarchy[region]}/>)
  }
}

export default Index
