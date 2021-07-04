import React from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Patient, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient } from "../state";
import { useParams } from "react-router-dom";
import { defineGenderIcon } from "../utils";
import 'semantic-ui-css/semantic.min.css';

const PatientPage = () => {
  const [{ currentPatient }, dispatch] = useStateValue();

  const { id } = useParams<{ id: string }>();
  const [error, setError] = React.useState<string | undefined>();

  React.useEffect(() => {

    const fetchPatient = async () => {

      if (!currentPatient || currentPatient.id !== id) {
        try {
          const { data: patient } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(setPatient(patient));
        } catch (e) {
          setError(e.response?.data?.error || 'Unknown error');
          console.error(error);
        }
      }
    };
    void fetchPatient();
  }, [dispatch]);

  return (
    <div className="App">
      {currentPatient &&
        <Container textAlign="left">
          <h2> {currentPatient.name} <i className={defineGenderIcon(currentPatient.gender)}></i> </h2>
          <p> ssn: {currentPatient.ssn}</p>
          <p> occupation: {currentPatient.occupation}</p>
          {currentPatient.entries.length > 0 && <b>entries</b>}
          {currentPatient.entries.map((entry: Entry) =>
            <div key={entry.id}>
              {entry.date} {entry.description}
              {entry.diagnosisCodes &&
                <ol>
                  {entry.diagnosisCodes.map(code =>
                    <li key={code}>
                      {code}
                    </li>)}
                </ol>
              }
            </div>
          )}
        </Container>
      }
    </div>
  );
};

export default PatientPage;
