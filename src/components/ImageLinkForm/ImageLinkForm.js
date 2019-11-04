import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
    return (
        <div class="content" id="linkform">
            <p>{'Enter a link to a picture.'}</p>
                <div class='center'>
                <input class='form' type='text' onChange={onInputChange}/>
                <button className='pa2'onClick={onSubmit}>Detect
                </button>  
            </div>
        </div>
       );
}

export default ImageLinkForm;