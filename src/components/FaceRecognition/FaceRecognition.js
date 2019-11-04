import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
    return (
       <div class='content' id="imagecontent">
           <div className='absolute mt2' id='result'>
           <img id='inputimage' src={imageUrl} alt='Your image will show up here!' width='300px' height='auto'></img>
           <div className='bounding-box' 
           style={{top: box.topRow, right:box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
           </div>
       </div>
    );
}

export default FaceRecognition;