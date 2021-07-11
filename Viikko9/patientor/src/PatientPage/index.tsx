import React from "react";
import axios from "axios";
import { Container, Button } from "semantic-ui-react";
import { Patient } from "../types";
import EntryList from "../components/EntryList";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient, addEntry } from "../state";
import { useParams } from "react-router-dom";
import { defineGenderIcon } from "../utils";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import 'semantic-ui-css/semantic.min.css';

const PatientPage = () => {
  const [{ currentPatient }, dispatch] = useStateValue();

  const { id } = useParams<{ id: string }>();
  const [error, setError] = React.useState<string | undefined>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(updatedPatient));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

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
        <div>
          <Container textAlign="left">
            <h2> {currentPatient.name} <i className={defineGenderIcon(currentPatient.gender)}></i> </h2>
            <b>Ssn: </b>{currentPatient.ssn} <br></br>
            <b>Occupation: </b> {currentPatient.occupation}
          </Container>
          {currentPatient.entries.length > 0 && <EntryList entries={currentPatient.entries} />}
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
          />
          <div style={{ marginTop: 16 }}>
            <Button onClick={() => openModal()}>Add New Entry</Button>
          </div>
        </div>
      }
    </div>
  );
};

export default PatientPage;
