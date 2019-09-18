import React from 'react';
import smile from './smile.png';

const Navigation = ({onRouteChange, isSignedIn}) => { 
        if (isSignedIn) {
        return (
            <nav style = {{height: '90px', background: '#F1F4B0', display: 'flex',
            alignitems: 'flex-start',
            flexwrap: 'nowrap',
            height: '100%'}}>
            <p style = {{ width: '20%'}} className='f4 black pa3 fw6'>FACE RECOGNIZER</p>
            <img src={smile} alt='logo' className='pa3 h3' />
            <div style = {{width: '60%'}} className='pa3 ma3'></div>
            <p onClick={() => onRouteChange('signout')} style = {{ width: '20%'}} className = 'f4 link dim black pa3 pointer'>Sign Out</p>
        </nav>
            );
        } else {
        return (
            <nav style = {{height: '90px', background: '#F1F4B0', display: 'flex',
            alignitems: 'flex-start',
            flexwrap: 'nowrap',
            height: '100%'}}>
                <p style = {{ width: '20%'}} className='f4 black pa3 fw6 mr2'>FACE RECOGNIZER</p>
                <img src={smile} alt='logo' className='pa3 h3' />
                <div style = {{width: '40%'}} className='pa3 ma3'></div>
                <p onClick={() => onRouteChange('signin')} style = {{width: '20%'}} className = 'f4 link dim black pa3 pointer'>Sign In</p>
                <p onClick={() => onRouteChange('register')} style = {{width: '20%'}} className = 'f4 link dim black pa3 pointer'>Register</p>
            </nav>
            );
        }
}

export default Navigation;