import { gql } from "@apollo/client";

const QUERY_PATIENT = gql`
  query GetPatient($id: String!) {
    patient(id: $id) {
      firstName
      lastName
    }
  }
`;

const QUERY_PATIENTSNAME = gql`
  query GetPatients {
    patients {
      _id
      firstName
      lastName
    }
  }
`;

const QUERY_PATIENTSINFO = gql`
  query GetPatients {
    patients {
      _id
      firstName
      lastName
      vitalSigns {
        bodyTemp
        heartRate
        bloodPressure
        respiratoryRate
        entryDate
      }
    }
  }
`;

const QUERY_PATIENTSALERT = gql`
  query GetPatientsAlert {
    patients {
      _id
      firstName
      lastName
      emegencyAlerts {
        situation
        contactNumber
        entryDate
      }
    }
  }
`;

const ADD_PATIENT = gql`
  mutation AddPatient(
    $username: String!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    addPatient(
      username: $username
      firstName: $firstName
      lastName: $lastName
      password: $password
    ) {
      _id
    }
  }
`;

const ADD_VITALSIGN = gql`
  mutation UpdateVitalSigns(
    $id: String!
    $bodyTemp: String!
    $heartRate: String!
    $bloodPressure: String!
    $respiratoryRate: String!
    $entryDate: String!
  ) {
    updateVitalSigns(
      id: $id
      bodyTemp: $bodyTemp
      heartRate: $heartRate
      bloodPressure: $bloodPressure
      respiratoryRate: $respiratoryRate
      entryDate: $entryDate
    ) {
      _id
    }
  }
`;

const ADD_EMERGENCYALERT = gql`
  mutation UpdateEmegencyAlert(
    $id: String!
    $situation: String!
    $contactNumber: String!
    $entryDate: String!
  ) {
    updateEmegencyAlert(
      id: $id
      situation: $situation
      contactNumber: $contactNumber
      entryDate: $entryDate
    ) {
      _id
    }
  }
`;

export {
  QUERY_PATIENT,
  QUERY_PATIENTSINFO,
  QUERY_PATIENTSNAME,
  QUERY_PATIENTSALERT,
  ADD_PATIENT,
  ADD_VITALSIGN,
  ADD_EMERGENCYALERT,
};
