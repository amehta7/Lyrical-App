import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import fetchSingleSong from '../queries/fetchSingleSong'
import { Link } from 'react-router'
import LyricCreate from './LyricCreate'
import LyricList from './LyricList'

class SongDetail extends Component {
  render() {
    //console.log(this.props.data)

    const { song, loading } = this.props.data

    if (loading) {
      return <div>Loading...</div>
    }

    return (
      <div className='conatiner'>
        <Link to='/'> Back</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics} />
        <LyricCreate songId={song.id} />
      </div>
    )
  }
}

export default graphql(fetchSingleSong, {
  options: (props) => {
    return { variables: { id: props.params.id } }
  },
})(SongDetail)
