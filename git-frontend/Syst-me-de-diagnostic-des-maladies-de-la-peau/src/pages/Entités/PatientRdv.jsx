import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useUserData } from '../../contexts/UserDataContext';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa'


export default function PatientRdv() {
  const {path} = useUserData()
  const [loading, setLoading] = useState(true)
  const [patient, setPatient] = useState("")
  const [data, setData] = useState([])
  const [filtredData, setFiltredData] = useState([])
  const {_id} = useParams()
  useEffect(() =>{
    let response = axios.get(`${path}/api/appointment/patient/${_id}`)
    .then(res =>{
      console.log(res.status + " status of request");
      setLoading(false)
      if(res.status === 200){
        res.data[0] != undefined ? setPatient(res.data[0].patient): setPatient("")
        setData(res.data)
        setFiltredData(res.data)
      }
      else{
          setData([])
      }

    })
    .catch(error => {
      if (error.response && error.response.status === 404) {
        setLoading(false)
        console.log("Patient introuvable");
      } else {
        console.error("Une erreur s'est produite : ", error);
      }
    });
}, []);

  const handleConfirm = () =>{

  }
  const handleDelete = () =>{

  }
  const handleEdit = () =>{

  }

  const transformDate = (date) =>{
    const fullDate = new Date(date);
    const formattedDate = fullDate.toLocaleString('en-US', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    return formattedDate;
  }
  const handleFilter = (event) => {
    
    const searchValue = event.target.value.toLowerCase();
    const newdata = filtredData.filter(row => 
      row.medecin.nom.toLowerCase().includes(searchValue) || 
      row.medecin.prenom.toLowerCase().includes(searchValue) || 
      row.dateDebutRdv.toLowerCase().includes(searchValue) 
      // row.statut.toLowerCase().includes(searchValue)
    );
    setData(newdata);
  }
  return (
    <>
    <h4 className='m-3'>Appointment List for the patient : <span className='text-success'>{patient}</span></h4>
    <div className='d-flex justify-content-end'>
      <input type='text' placeholder='Search...' className='p-1 m-2' onChange={handleFilter}/>
    </div>
    <Table striped bordered responsive className='m-1'>
    <thead>
            {/* <th>Patient</th> */}
            <th>Doctor</th>
            <th>date</th>
            <th>Statut</th>
            <th>Action</th>
          </thead>

          <tbody>
            {data.length !== 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.medecin.nom + " " + item.medecin.prenom}</td>
                  <td>{transformDate(item.dateDebutRdv)}</td>
                  <td>{item.statut === false ? 'waiting' : 'confirmed'}</td>
                  <td>
                    <FaEdit onClick={() => handleEdit(item)} style={{ cursor: 'pointer', color: 'blue', marginRight: '10px' }} />
                    <FaTrash onClick={() => handleDelete(item)} style={{ cursor: 'pointer', color: 'red', marginRight: '10px' }} />
                    {item.statut ===false && <FaCheck onClick={() => handleConfirm(item)} style={{ cursor: 'pointer', color: 'green' }} />}
                  </td>
                </tr>
              ))
            ) : (
              loading && (
                <tr>
                    <td colSpan="4">
                      <Box sx={{ display: 'flex', alignItems: "center", justifyContent: "center" }} className="text-center">
                        <CircularProgress />
                      </Box>
                    </td>
                  </tr>

              )
            )}
            
          </tbody>
    </Table>
    </>
  )
}
