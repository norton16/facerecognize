import React from 'react';
import smile from './smile.png';

const Navigation = () => {
    return (
        <nav style = {{height: '90px', background: '#F1F4B0', display: 'flex',
        flexflow: 'row nowrap'}}>
            <p style = {{ width: '50%'}} className='f4 black pa3 fw4'>FACE RECOGNIZER</p>
            <img src={smile} alt='logo' className='pa3 h3' />
            <p style = {{ width: '50%'}} className = 'f4 link dim black pa3 pointer'>Sign Out</p>
        </nav>
    );
}

export default Navigation;