import React, { useState, useEffect } from 'react';
import DashboardHeader from '../components/DashboardHeader';

import { calculateRange, sliceData } from '../utils/table-pagination';

import './dashboard/style.css';
import { useUserData } from '../contexts/UserDataContext';
import NotificationIcon from '../assets/icons/notification.svg';
import SettingsIcon from '../assets/icons/settings.svg';
import Form from '../components/form/form_medecin';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Form_confirm_delete from '../components/form/form_delete';
import { MDBIcon } from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faEye, faHouseMedicalFlag } from '@fortawesome/free-solid-svg-icons';
import Form_Medecin from '../components/form/form_medecin';
import Profile from '../pages/profiles/Profile';
import { fetchMedecin } from '../components/fetchElement/fetchMedecins';
import { fetchMedecinRdvs } from '../components/fetchElement/fetchRdvs';
import Transition from '../constants/transition';
import { Table } from 'react-bootstrap';

function MedecinsUp() {
  const { medecins, updateRdvs } = useUserData();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);
  const [filteredMedecins, setFilteredMedecins] = useState([]);
 
  const { medecin, updateMedecin, updatePatient, updateSecretaire, isPatient, isMedecin } = useUserData()
  const { userData, path } = useUserData();

  updatePatient(null);
  updateSecretaire(null);
  // updateMedecin(null);

 


  useEffect(() => {
    setPagination(calculateRange(medecins, 5));
    setFilteredMedecins(sliceData(medecins, page, 5));
  }, [medecins]);

  // Search
  const __handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value !== '') {
      let search_results = medecins.filter(
        (medecin) =>
          medecin.nom.toLowerCase().includes(search.toLowerCase()) ||
          medecin.prenom.toLowerCase().includes(search.toLowerCase())||
          medecin.tel.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredMedecins(search_results);
    } else {
      __handleChangePage(1);
    }
  };

  // Change Page
  const __handleChangePage = (new_page) => {
    setPage(new_page);
    setFilteredMedecins(sliceData(medecins, new_page, 5));
  };

  


 
  

  return (
    <Transition>
      <div className='dashboard-content'>
      <div className='dashbord-header-container'>
        <button className='dashbord-header-btn' onClick={()=>{
        
          }}>New Doctor</button>
        <div className='dashbord-header-right'>
          <img
            src={NotificationIcon}
            alt='notification-icon'
            className='dashbord-header-icon' />
          <img
            src={SettingsIcon}
            alt='settings-icon'
            className='dashbord-header-icon' />
          {/* <img
            className='dashbord-header-avatar'
            src={userData.photo} /> */}
        </div>
      </div>

      <div className='dashboard-content-container'>
        <div className='dashboard-content-header'>
          <h2>DOCTORS LIST</h2>
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

        <Table striped bordered responsive>
          <thead>
            <th>FIRST NAME</th>
            <th>LAST NAME</th>
            <th>USERNAME</th>
            {/* <th>Adresse</th> */}
            <th>PHONE</th>
            <th>GENDER</th>
            <th>ACTIONS</th>
          </thead>

          {filteredMedecins.length !== 0 ? (
            <tbody>
              {filteredMedecins.map((medecin, index) => (
                <tr key={index}>
                  <td>
                    <span>{medecin.nom}</span>
                  </td>
                  <td>
                    <span>{medecin.prenom}</span>
                  </td>
                  <td>
                    <span>{medecin.username}</span>
                  </td>
                  {/* <td>
                    <span>{medecin.adresse}</span>
                  </td> */}
                  <td>
                    <span>{medecin.tel}</span>
                  </td>
                  <td>
                    <span>{medecin.genre}</span>
                  </td>
                  <td>
                    {userData.role.includes('admin') &&
                      <>
                        <span>
                          <button className='elt-btn btn elt-btn-success' onClick={() => {
                            
                            console.log("hhhhh")
                          }
                          }>
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                        </span>
                        <span>
                          <button className='elt-btn btn btn-danger display-flex' onClick={() => {
                           
                            console.log("hhhhhh")
                          }}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </button>
                        </span>
                      </>
                    }
                    <span>
                      <button className='elt-btn btn btn-primary' onClick={() => {
                        
                         console.log("hhhhhh")
                      }}>
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                    </span>
                    <span>
                      <button className='elt-btn btn btn-warning' onClick={() => console.log("hhhhhh")}>
                        <FontAwesomeIcon icon={faHouseMedicalFlag}/>
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : null}
        </Table>

        {filteredMedecins.length !== 0 ? (
          <div className='dashboard-content-footer'>
            {pagination.map((item, index) => (
              <span
                key={index}
                className={item === page ? 'active-pagination' : 'pagination'}
                onClick={() => __handleChangePage(item)}>
                {item}
              </span>
            ))}
          </div>
        ) : (
          <div className='dashboard-content-footer'>
            <span className='empty-table'>No data</span>
          </div>
        )}
      </div>
      
    </div>
    </Transition>
  );
}

export default MedecinsUp;
