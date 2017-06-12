import React, {Component} from 'react';
import './App.css';
const getCount = require('starred-count');


const flex_container = {
  display: 'flex',
  flexFlow: 'wrap',
  justifyContent: 'center space-around',
  alignItems: 'center'
}


const form_container = {
  display: 'flex',
  flexFlow: 'wrap',
  justifyContent: 'center space-around',
  alignItems: 'center',
  flexDirection: 'column',

  width: 350,
  height: 550,
  border: '5px solid blue',
  borderRadius: '5%',
  backgroundColor: '#d9adee'
}

const form_container2 = {
  display: 'flex',
  flexFlow: 'wrap',
  justifyContent: 'center space-around',
  alignItems: 'center',
  flexDirection: 'column',

  width: 350,
  height: 480,
  borderRadius: '5%',
  backgroundColor: '#d9adee'
}

const git_icon = {
  display: 'flex',
  padding: 10,
  width: 60,
  height: 60
}

const heading = {
  display: 'flex'
}

const picture = {
  display: 'flex',
  width: 170,
  height: 170,
  borderRadius: '50%'
}

const input_style = {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'row'
}

const div = {
  display: 'flex',
  flexDirection: 'column',
  margin: 5
}

const fetch_style = {
  justifyContent: 'center',
  borderRadius: '3%',
  margin: 5,
  height: 25,
  width: 60
}

const text_style = {
  justifyContent: 'center',
  borderRadius: '3%',
  margin: 5,
  height: 20,
  width: 120
}

const label_style = {
  display: 'flex',
  fontSize: 15,
  color: 'grey'
}

const image_src = 'https://octodex.github.com/images/electrocat.png';
const icon_src = 'https://cdn1.iconfinder.com/data/icons/logotypes/32/github-512.png';
const error_url ='http://appslova.com/wp-content/uploads/2016/03/Android-error.png';
const spinner = 'http://filepreviews.io/img/spinner.gif';
//////////////////////////////////////////

class App extends Component {

	changeHandler = (event) => {
		this.setState({text: event.target.value});
	}

  fetchHandler = () => {
    console.log(this.state.text);
    const login = this.state.text;
    this.fetch(login);

  }

  errorHandler = (status) => {
    console.log(this.state.status);
    if (this.state.status === 404) {
      this.setState({avatar_url : error_url, login: 'NO ONE'})
    }
  }

  async fetch (log) {
    try {
      this.setState({avatar_url : spinner});
      const req = await fetch('https://api.github.com/users/'+log);
      const status = await req.status;
      this.setState({status});
      console.log(status);
      setTimeout(() => {
        this.errorHandler(status);
      }, 4 * 1000)
      const {avatar_url,login, followers, public_repos} = await req.json();
      const stars = await getCount(login);
      this.setState({avatar_url,login, followers, stars, public_repos});
    } catch (e) {
      console.error(e);
    }
  }

  state = {
    status: 200,
    avatar_url: image_src,
    login: 'electrocat',
    followers: '0',
    stars: '0',
    public_repos: '0',
    text: ''
  };



	render() {
		return (
			<div style={flex_container} className="App">
        <form style={form_container}>
            <div style={form_container2}>

              <div style={heading}>
                <img alt={''} src= {icon_src} style={git_icon}/>
                <h1> github-card </h1>
              </div>

    					<img alt={''} style={picture} src={this.state.avatar_url}/>

              <div>
                <label style={label_style}>#Username</label>
                <p>  {this.state.login} </p>
              </div>

              <div style={input_style}>
    			          <div style={div}>
                      <label style={label_style}>#Followers</label>
                      <p> {this.state.followers}</p>
                    </div>

                    <div style={div}>
                      <label style={label_style}>#Stars</label>
                      <p> {this.state.stars}</p>
                    </div>

                    <div style={div}>
                      <label style={label_style}>#Repos</label>
                      <p> {this.state.public_repos}</p>
                    </div>
              </div>

      				<div style={input_style}>
                <input
                  style={text_style}
                  type="text"
                  value={this.state.text}
                  onChange={this.changeHandler}
                />
                <input
                  style={fetch_style}
        					type="button"
        					value="Fetch"
                  onClick={this.fetchHandler}
      					/>
            </div>
          </div>
        </form>
			</div>
		)
	}
}
export default App;
