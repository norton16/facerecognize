import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
    return (
        <div style={{display:'flex', flexDirection:'column'}}>
            <p className = 'f4'>{'Try giving this site a picture, and it will detect a face.'}</p>
            <div className='center'>
                <div className='center pa4 br3'>
                <input className='f4 pa2 w-70 ba bb1 center' type='text' onChange={onInputChange}/>
                <button className='w-30 f4 link ph2 pv2 dib ba bw0 black'
                        onClick={onSubmit}>Detect
                </button>
                </div> 
            </div>
        </div>
       );
}

export default ImageLinkForm;