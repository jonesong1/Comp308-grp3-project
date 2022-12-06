import React, { useState, useEffect } from 'react';
//import ReactDOM from 'react-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function App() {
  
  const pagestyle = {
    color: "black",
    backgroundColor: "LightBlue",
    padding: "20px",
    fontFamily: "Arial"
  };
  const pagestyle1 = {
    color: "black",
    backgroundColor: "SteelBlue",
    padding: "20px",
    fontFamily: "Arial"
  };
return (
  <div className="App">
          <div className="container mt-5" style={pagestyle1}>
              <div className="card">
                  <div className="card-body"style={pagestyle}>

                      <div className="row  d-flex justify-content-center align-items-center">
                          <div className="col-md-6">
                              <img className='img-fluid' src="logo.png" alt="" />
                          </div>
                          <div className="col-md-6">
                              <h3>Login</h3>
                              <div className="form-group mt-4">
                                  <label htmlFor="">Username</label>
                                  <input type="text" className='form-control' />
                              </div>
                              <div className="form-group mt-4">
                                  <label htmlFor="">Password</label>
                                  <input type="password" className='form-control' />
                              </div>
                              <button lassName='btn btn-primary mt-4'>Loginas as a Nurse</button>
                          </div>
                          
                      </div>


                  </div>
              </div>
          </div>
      </div>
);
}
export default App;

