import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Logos from './components/Logos/Logos.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import './App.css';


// const particlesOptions = {
//   particles: {
//     number: { value: 30,
//       density: {
//         enable: true,
//         value_area: 800
//       }    
//     },
//     color: {
//       value: '#d6d6d0'
//     }
//   }
// }

const app = new Clarifai.App({
  apiKey: 'bb84855f50d34471bda9f01354928bc8'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '', //image displays on submit (see onSubmit)
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value); //displays input in console
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input})
    console.log('click');
    app.models.predict(
Clarifai.COLOR_MODEL,
    "https://samples.clarifai.com/metro-north.jpg"
)
.then(function(response) {
    // do something with response
    console.log(response);
    },
    function(err) {// there was an error
    }
  );
  }

  render() {
    return(
    <div className="App">
      {/* <Particles className='particles'
              params={particlesOptions} 
              /> */}
    {/* First lay out components here */}
     <Navigation />
     <Logos />
     <Rank />
     <ImageLinkForm 
     onInputChange={this.onInputChange} 
      onSubmit={this.onSubmit}/>
     <FaceRecognition imageUrl={this.state.imageUrl}/>
    </div>
  );
}
}
export default App;


// Heads up that the clarifai API has been updated since I 
//made the next video. You will get an error using Clarifai.DETECT_FACE,  
//it appears to have changed to Clarifai.FACE_DETECT_MODEL (Read more about it here: https://clarifai.com/developer/guide).

// Also, the URL in the next video has also been updated. Keep this in mind as you go through the exercise:



// app.models
// .predict(
// Clarifai.COLOR_MODEL,
//     // URL
//     "https://samples.clarifai.com/metro-north.jpg"
// )
// .then(function(response) {
//     // do something with responseconsole.log(response);
//     },
//     function(err) {// there was an error}
// );