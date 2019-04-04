import React, { Component } from 'react';
import ProfileIcon from 'react-icons/lib/md/person-outline';

import './Compose.css';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *APP* COMPONENT

export default class Compose extends Component {
  constructor() {
    super();
    
    this.state = {
      text: ''
    };

    this.createPost = this.createPost.bind( this );
  }

  updateText( text ) {
    this.setState({ text });
  }

  createPost() {
    let day = new Date;
    let monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let month = monthIndex.filter(() => day.getMonth())

    let body = {
      text: this.state.text,
      date: `${day.getDay()} ${month} ${day.getFullYear()}`,
      id: `${(this.props.posts[this.props.posts.length - 1].id) + 1}` 
    }

    this.props.createPost(body);
    this.setState({text: ''})
  }

  render() {
    // Destructuring
    const { text } = this.state;

    return (
      <section className="Compose__parent">
        <div className="Compose__top">

          <div className="Compose__profile-picture">
            <ProfileIcon />
          </div>

          {/* This is where you type the message for your new post */}
          <input className="Compose__input"
                 placeholder="What's on your mind?"
                 value={ text }
                 onChange={ ( e ) => this.updateText( e.target.value ) } />

        </div>

        <div className="Compose__bottom">
          <button onClick={ () => this.createPost(this.state.text) }>Compose</button>
        </div>
      </section>
    )
  }
}