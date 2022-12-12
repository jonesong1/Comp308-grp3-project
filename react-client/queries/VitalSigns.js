import React from "react";
import { gql, useQuery } from "@apollo/react-client";
import { Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";




const GET_VITALSIGNS = gql`
  {
    vitalSigns {
      bodyTemp
      heartRate
      bloodPressure
      respiratoryRate
      entryDate
    }
  }
`;

const VitalSigns = () => {
    const [authUserToken] = useAuthUserToken();
    const { currentUserType } = getCurrentUserInfo(authUserToken);
  
    const { loading, error, data, refetch } = useQuery(GET_VITALSIGNS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    if (currentUserType !== "Nurse") {
      return (
        <Container>
          <h2>Access denied</h2>
          <h5>Sorry, but you don't have permission to access this page</h5>
          <a type="button" className="btn btn-primary" href="/">
            Go to Home
          </a>
        </Container>
      );
    } else {
        return (
          <Container>
            <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>Body Temperature</th>
                  <th>Heart Rate</th>
                  <th>Blood Pressure</th>
                  <th>Respiratory Rate</th>
                  <th>Entry Date</th>
                </tr>

                </thead>
          {data.vitalSigns.map((vitalSign, index) => (
            <tr key={index}>
              <td>{vitalSign.bodyTemp}</td>
              <td>{vitalSign.heartRate}</td>
              <td>{vitalSign.bloodPressure}</td>
              <td>{vitalSign.respiratoryRate}</td>
              <td>{vitalSign.entryDate}</td>
            </tr>
          ))}
        </table>

        <Button onClick={() => refetch()}>
          Refetch <FontAwesomeIcon icon={faRefresh} />
        </Button>
      </Container>
    );
  }
};

export default VitalSigns;
