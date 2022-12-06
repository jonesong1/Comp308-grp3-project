import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import React, { useState } from 'react';

//
function RegisterNurse(props) {
    //
    const username = props.screen;
    console.log('props.screen',props.screen)
    const [nurse, setNurse] = useState({_id: '', firstName: '', lastName:'', username: '', password: '', });
    const [showLoading, setShowLoading] = useState(false);
    //
    const apiUrl = "http://localhost:3000/api/courses";
    const saveNurse = (e) => {
        setShowLoading(true);
        e.preventDefault();
        const data = {firstName: nurse.firstName, lastName: nurse.lastName,username: nurse.username,password: nurse.password };
        axios.post(apiUrl, data)
        .then((result) => {
            setShowLoading(false);
            console.log('results from save nurse:',result.data)
            props.history.push('/listNurses/' + result.data._id)

        }).catch((error) => setShowLoading(false));
    };

    const onChange = (e) => {
        e.persist();
        setNurse({...nurse, [e.target.name]: e.target.value});
      }
      const pagestyle1 = {
        color: "black",
        backgroundColor: "SteelBlue",
        padding: "20px",
        fontFamily: "Arial"
      };
      const pagestyle = {
        color: "black",
        backgroundColor: "LightBlue",
        padding: "20px",
        fontFamily: "Arial"
      };

      return (
        <div>
          {showLoading && 
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner> 
          } 
          <Jumbotron style={pagestyle}>
            <Form onSubmit={saveNurse}>
            <Form.Group>
                <Form.Label>Nurse UserName</Form.Label>
                <Form.Control type="text" name="username" id="username" placeholder="Enter UserName" value={nurse.username} onChange={onChange} />
              </Form.Group>
              <Form.Group>
              <Form.Label>Password</Form.Label>
                <Form.Control type="text" name="password" id="password" placeholder="Enter password" value={nurse.password} onChange={onChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label> First Name</Form.Label>
                <Form.Control type="text" name="firstName" id="firstName" placeholder="Enter First Name" value={nurse.firstName} onChange={onChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label> Last Name</Form.Label>
                <Form.Control type="text" name="lastName" id="lastName" placeholder="Enter Last Name" value={nurse.lastName} onChange={onChange} />
              </Form.Group>
              <Button variant="primary" type="submit">
            Register Nurse
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(RegisterNurse);