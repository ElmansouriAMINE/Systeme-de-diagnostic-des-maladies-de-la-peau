import React, { useRef } from 'react'
import { useState } from 'react'
import { useUserData } from '../../contexts/UserDataContext'
import { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import $ from 'jquery';
// import 'datatables.net-dt/js/jquery.dataTables';
// import 'datatables.net-dt/css/jquery.dataTables.css';


export default function MedecinRdv() {
    const [data, setData] = useState([])
    const [filtredData, setFiltredData] = useState([])
    const {path} = useUserData()
    const [doctor, setDoctor] = useState("")
    const [loading, setLoading] = useState(true)
    const {_id} = useParams()
    const tableRef = useRef(null);

      useEffect(() =>{
        console.log(_id);
          let response = axios.get(`${path}/api/appointment/doctor/${_id}`)
          .then(response =>{
            setLoading(false)
            setDoctor(response.data[0].doctor)
            setData(response.data)
            setFiltredData(response.data)
          }).catch(error =>{
            setLoading(false)
            if(error.response && error.response.statut ===404){
              console.log("No appointment for this doctor");
            }
            else{
              console.log("somethings go wrong");
            }
          })
      },[_id])

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
          row.patient.nom.toLowerCase().includes(searchValue) || 
          row.doctor.toLowerCase().includes(searchValue) ||
          row.patient.tel.toLowerCase().includes(searchValue) 
          // row.statut.toLowerCase().includes(searchValue)
        );
        setData(newdata);
      }


      const itemsPerPage = 10; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the range of items to display based on currentPage
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedData = data.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };


  
  return (
    <>
    <h4 className='m-3'>Appointment List for the doctor : <span className='text-success'>{doctor}</span></h4>
    <div className='d-flex justify-content-end'>
      <input type='text' placeholder='Search...' className='p-1 m-2' onChange={handleFilter}/>
    </div>
    <Table striped bordered responsive className='p-1 m-2' ref={tableRef}>
    <thead>
            <th>Patient</th>
            {/* <th>Doctor</th> */}
            <th>Phone</th>
            <th>date</th>
            {/* <th>Hour</th> */}
            <th>Statut</th>
          </thead>

          <tbody>
            {
              data.length !== 0 ? (
                data.map((item, index) => (
                  <tr key={index}> {/* Add a unique key for each row */}
                    <td>{item.patient.nom + " "+ item.patient.prenom}</td>
                    {/* <td>{item.doctor}</td> */}
                    <td>{item.patient.tel}</td>
                    <td>{transformDate(item.dateDebutRdv)}</td>
                    {item.statut == false ?
                    <td>waiting</td>
                    :
                    <td>confirmed</td>
                  }
                  </tr>
                ))
              )
        
              : (
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
