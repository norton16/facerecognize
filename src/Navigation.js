import React from 'react';
import smile from './smile.png';

const Navigation = ({onRouteChange, isSignedIn}) => { 
      
        return (
            <nav class="navigation" style = {{height: '90px', background: '#F1F4B0', display: 'flex',
            alignitems: 'center',
            flexwrap: 'wrap',
            height: 'auto',
            }}>
            <p class="navElement" >FACE RECOGNIZER</p>
            <img class="navElement" src={smile} alt='logo'/>
            {/* <div style = {{width: '60%'}} className='pa3 ma3'></div> */}
        </nav>
            );
}

export default Navigation;