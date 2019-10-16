import React from 'react';

const Rank = ({name, entries}) => {
    return (
        <div className='ma4'>
            <div className='f3'>
            {`${name}, your current entry count is...`}
            </div>
            <div className='f3'>
            {entries}
            </div>
        </div>
       );
}

export default Rank;