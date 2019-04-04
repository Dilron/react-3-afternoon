import React, { Component } from 'react';
import axios from 'axios'

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.handleSearch = this.handleSearch.bind(this);
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts')
    .then(res => {
      this.setState({posts: res.data})
      console.log('res of getposts', res)
    })
  }

  updatePost(id, text) {
    let textObj = {
      text: text
    }
    console.log('post id', id,' post text',text)
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, textObj)
    .then( res => {
      this.setState({posts: res.data})
    })
    .catch( res => {
      console.log('err', res)
    })
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
    .then( res => {
      this.setState({posts: res.data})
    })

  }

  createPost(body) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`, body)
    .then( res => {
      this.setState({posts: res.data})
    })
  }

  handleSearch(val){
    console.log('search ping',val)
    let uriVal = encodeURI(val)
    axios.get(`https://practiceapi.devmountain.com/api/posts/filter?text=${uriVal}`)  
      .then( res => {
        this.setState({posts: res.data})
      }
      )
  }

  // showPosts()

  render() {
    const { posts } = this.state;
    const showPosts = posts.map(post => {
      return <Post 
      id={post.id}
      key={post.id}
      postText={post.text}
      postDate={post.date}
      editPost={this.updatePost}
      deletePost={this.deletePost}/>
    })

    return (
      <div className="App__parent">
        <Header
        handleSearch={this.handleSearch} />

        <section className="App__content">

          <Compose 
          createPost={this.createPost}
          posts={this.state.posts}/>
          {showPosts}
          
        </section>
      </div>
    );
  }
}

export default App;
