import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Link, hashHistory } from 'react-router'
import fetchSongsQuery from '../queries/fetchSongs'

class SongCreate extends Component {
  constructor(props) {
    super(props)

    this.state = { title: '' }
  }

  submitHandler(e) {
    e.preventDefault()
    //console.log(this.props)

    this.props
      .mutate({
        variables: {
          title: this.state.title,
        },
        refetchQueries: [{ query: fetchSongsQuery }],
      })
      .then(() => hashHistory.push('/'))
  }

  render() {
    return (
      <div>
        <Link to='/'> Back</Link>
        <h3>Create a New Song</h3>
        <form onSubmit={this.submitHandler.bind(this)}>
          <label htmlFor='title'>Song Title :</label>
          <input
            type='text'
            id='title'
            value={this.state.title}
            onChange={(e) => this.setState({ title: e.target.value })}
          />
        </form>
      </div>
    )
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`

export default graphql(mutation)(SongCreate)
