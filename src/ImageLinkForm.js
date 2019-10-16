import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
    return (
        <div class="content">
            <p className = 'f4'>{'Enter a link to a picture!'}</p>
                <div className='center pa4 br3' class='center'>
                <input className='f4 pa2 ba bb1 center' class='form' type='text' onChange={onInputChange}/>
                <button className='pa2'onClick={onSubmit}>Detect
                </button>  
            </div>
        </div>
       );
}

export default ImageLinkForm;