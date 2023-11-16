import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class LyricList extends Component {
  onLikeHandler(id, likes) {
    //console.log(id)
    this.props.mutate({
      variables: {
        id: id,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id: id,
          likes: likes + 1,
          __typename: 'LyricType',
        },
      },
    })
  }

  renderLyrics() {
    return this.props.lyrics.map((l) => (
      <li key={l.id} className='collection-item'>
        {l.content}
        <div className='vote-box'>
          <i
            className='material-icons'
            onClick={() => this.onLikeHandler(l.id, l.likes)}
          >
            thumb_up
          </i>
          {l.likes}
        </div>
      </li>
    ))
  }

  render() {
    return <ul className='collection'>{this.renderLyrics()}</ul>
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`

export default graphql(mutation)(LyricList)
