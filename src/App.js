import React, {Component} from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Logos from './components/Logos/Logos.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import Signin from './components/Signin/Signin.js';
import Register from './components/Register/Register.js';
import './App.css';

const app = new Clarifai.App({
  apiKey: 'bb84855f50d34471bda9f01354928bc8'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '', //image displays on submit (see onSubmit)
      box: {},
      route: 'signin', //keeps track of location on page
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }


  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
      //this goes to response function below
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value}); //displays input in console
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(
Clarifai.FACE_DETECT_MODEL,
this.state.input)
.then(response => {
  if (response) {
    fetch('http//localhost:3001/image', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: this.state.user.id
      })
    })
    .then(response => response.json())
    .then(count => {
      this.setState(Object.assign(this.state.user, {entries: count}))
    })
  }
  this.displayFaceBox(this.calculateFaceLocation(response))
})
.catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route}); //Redirects to home when sign in or out is clicked
  }

  render() {
    return(
    <div className="App">
    {/* First lay out components here */}
     <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
     { this.state.route === 'home' 
     ? <div>
        <Logos />
        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
        <ImageLinkForm 
        onInputChange={this.onInputChange} 
          onSubmit={this.onSubmit}/>
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
     </div>
     : (
      this.state.route === 'signin' 
      ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
      : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
     )
     }
    </div>
  );
}
}
export default App;