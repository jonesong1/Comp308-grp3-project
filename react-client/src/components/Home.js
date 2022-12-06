
import { withRouter } from 'react-router-dom';

import React, { Component }  from 'react';

function Home(props)
{


    return (
        <div>
            <h2>Welcome to Medical App</h2>
            <button className='primary'>Login As a Nurse</button>&nbsp;&nbsp;
            <button className='primary'>Login As a Patient</button>
        </div>


    );

}

export default withRouter(Home);