import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { calculateRange, sliceData } from '../../utils/table-pagination';
import '../styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrashAlt, faClipboardUser, faSuitcaseMedical, faLungsVirus } from '@fortawesome/free-solid-icons';
import { faEdit, faTrashAlt, faClipboardUser, faSuitcaseMedical, faLungsVirus } from '@fortawesome/free-solid-svg-icons';
import { useUserData } from '../../contexts/UserDataContext';
import Form__delete_consultation from '../../components/form/form_delete_consult';
import Transition from '../../constants/transition';
// import { Navigate } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom'
// import { useHistory } from 'react-router-dom';
import { fetchConsultationDiagnostic } from '../../components/fetchElement/fetchDiagnostic';
// import { fetchConsultation } from '../../components/fetchElement/fetchConsultations';
import './style.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
// import $ from 'jquery';
import Typography from '@mui/material/Typography';
import { Table } from 'react-bootstrap';

function TodayConsultations() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);
  const [filteredConsultations, setFilteredConsultations] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);
  const [modalIsOpen3, setModalIsOpen3] = useState(false);
  const [modalIsOpen4, setModalIsOpen4] = useState(false);
  const [modalIsOpen5, setModalIsOpen5] = useState(false);
  const { consultation, userData, path ,updateDiagnostics} = useUserData();
  const user_id = localStorage.getItem('user_id');
  const [showProgress, setShowProgress] = useState(true);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
      const timeout = setTimeout(() => {
      setShowProgress(false);
      setShowText(true);
    }, 40000); 
    return () => {
      clearTimeout(timeout); 
    };
  }, []);

  useEffect(() => {
    const fetchMedecinDayConsultations = async () => {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        const response = await axios.get(`${path}/api/visite/dermatologue/today/${user_id}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        // Use updateConsultation here if necessary
        setConsultations(response.data)
        console.log(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données consultations:', error);
      }
    };

    // Call the function to fetch consultations
    fetchMedecinDayConsultations();
  }, [path, user_id]);

  useEffect(() => {
    setPagination(calculateRange(consultations, 5));
    setFilteredConsultations(sliceData(consultations, page, 5));
  }, [consultations, page]);

  const __handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value !== '') {
      let search_results = consultations.filter(
        (consultation) =>
          consultation.dateConsult.toLowerCase().includes(search.toLowerCase()) ||
          consultation.heure.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredConsultations(search_results);
    } else {
      __handleChangePage(1);
    }
  };

  // Change Page
  const __handleChangePage = (new_page) => {
    setPage(new_page);
    setFilteredConsultations(sliceData(consultations, new_page, 5));
  };

 

  const fetchConsultation = async (path,consult_id,updateConsultation) => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      const response = await axios.get(`${path}/api/consultation/${consult_id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      updateConsultation(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Erreur lors de la récupération des données consultation :', error);
    }
  };

  const fdelete = (consultation_id) => {
    fetchConsultation(path, consultation_id);
    if (consultation && consultation_id == consultation._id) {
      if (userData.role.includes('secretaire') && consultation.diagnostics.length !== 0) {
        alert("Impossible to delete this visit, it contains diagnostics");
        return;
      }
      modalIsOpen3 ? setModalIsOpen3(false) : setModalIsOpen3(true);
    }
  }

  const fdiagnostics = (consultation_id) => {
    localStorage.setItem("consultation_id",consultation_id);
    fetchConsultation(path, consultation_id);
    fetchConsultationDiagnostic(path, consultation_id, updateDiagnostics);
    if (consultation_id) {
      modalIsOpen4 ? setModalIsOpen4(false) : setModalIsOpen4(true);
    }
  }

  return (
    <Transition>
      <div className='dashboard-content'>
        <div className='dashboard-content-container'>
          <div className='dashboard-content-header'>
            <h2>CONSULTATION LIST</h2>
            <div className='dashboard-content-search'>
              <input
                type='text'
                value={search}
                placeholder='Search..'
                className='dashboard-content-input'
                onChange={(e) => __handleSearch(e)}
              />
            </div>
          </div>
          <Table responsive striped bordered>
            <thead>
              <th>PATIENT</th>
              <th>PATIENT TEL</th>
              <th>DOCTOR</th>
              <th>DATE</th>
              <th>HOUR</th>
              <th>ACTIONS</th>
            </thead>
            {filteredConsultations.length !== 0 ? (
              <tbody>
                {filteredConsultations.map((consultation, index) => (
                  <tr key={index}>
                    <td>
                      <span>{consultation.rdv.patient.nom} {consultation.rdv.patient.prenom}</span>
                    </td>
                    <td>
                      <span>{consultation.rdv.patient.tel}</span>
                    </td>
                    <td>
                      <span>{consultation.rdv.medecin.nom} {consultation.rdv.medecin.prenom}</span>
                    </td>
                    <td>
                      <span>{new Date(consultation.dateConsult).toISOString().split('T')[0]}</span>
                    </td>
                    <td>
                      <span>
                        {new Date(consultation.dateConsult).getHours()}:{new Date(consultation.dateConsult).getMinutes()}
                      </span>
                    </td>
                    <td>
                      <span>
                        <button className='elt-btn btn btn-danger display-flex' title='deletion' onClick={() => fdelete(consultation._id)}>
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </span>
                      {userData.role.includes('medecin') && !userData.role.includes('admin') && (
                        <span>
                          <button className='elt-btn btn btn-dark' title='diagnostics' onClick={() => fdiagnostics(consultation._id)}>
                            <FontAwesomeIcon icon={faClipboardUser} />
                          </button>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : null}
          </Table>
          {filteredConsultations.length !== 0 ? (
            <div className='dashboard-content-footer'>
              {pagination.map((item, index) => (
                <span
                  key={index}
                  className={item === page ? 'active-pagination' : 'pagination'}
                  onClick={() => __handleChangePage(item)}
                >
                  {item}
                </span>
              ))}
            </div>
          ) : (
            // <div className='dashboard-content-footer'>
            //   <span className='empty-table'>No data</span>
            // </div>

            <div className="text-center">
                    {showProgress && (
                        <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                        </Box>
                    )}
                                    {showText && <Box display="flex" justifyContent="center">
                        <Typography variant="body1">
                        Le chargement est terminé ! Aucune information trouvée
                        </Typography>
                        </Box>
                        }
                                </div>
                )}
        </div>
        {modalIsOpen3 && <Form__delete_consultation open={modalIsOpen3} consultationToDelete={consultation} />}
        {modalIsOpen4 && <Navigate to='/dashboard/diagnostics' />}
      </div>
    </Transition>
);
}

export default TodayConsultations;