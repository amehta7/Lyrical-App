import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class LyricCreate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      content: '',
    }
  }

  submitHandler(e) {
    e.preventDefault()

    //console.log(this.props)

    this.props
      .mutate({
        variables: { content: this.state.content, songId: this.props.songId },
      })
      .then(() => this.setState({ content: '' }))
  }

  render() {
    return (
      <form onSubmit={this.submitHandler.bind(this)}>
        <label htmlFor='lyric'>Add a Lyric</label>
        <input
          type='text'
          id='lyric'
          value={this.state.content}
          onChange={(e) => this.setState({ content: e.target.value })}
        />
      </form>
    )
  }
}

const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`

export default graphql(mutation)(LyricCreate)
