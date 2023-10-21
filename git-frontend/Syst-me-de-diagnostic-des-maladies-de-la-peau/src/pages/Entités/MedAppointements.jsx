import React, { useRef } from 'react'
import { useState } from 'react'
// import { useUserData } from '../../contexts/UserDataContext'
import { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import $ from 'jquery';
import Typography from '@mui/material/Typography';
import { useUserData } from '../../contexts/UserDataContext';
// import 'datatables.net-dt/js/jquery.dataTables';
// import 'datatables.net-dt/css/jquery.dataTables.css';


export default function MedAppointements() {

    const { path } = useUserData();
    const [user, setUser] = useState();
    const [showModal, setShowModal] = useState(false);
    const [docs, setDocs] = useState(false)
    const [showProgress, setShowProgress] = useState(true);
    const [showText, setShowText] = useState(false);

  
    const [data, setData] = useState([])
    const [filtredData, setFiltredData] = useState([])
    const [doctor, setDoctor] = useState("")
    // const _id = useParams()?.id;
    const tableRef = useRef(null);

    useEffect(() => {
        const user_id = localStorage.getItem('user_id');
        axios.get(`${path}/api/appointment/doctor/${user_id}`)
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
            console.error('Error fetching appointments:', error);
          })
          .finally(() => {
            console.log("Request completed!");
          });
      }, []);
      
    

  
   
    
    
    

    // useEffect(() => {
    //     console.log(`medecin : ${medecin["_id"]}`)
    //     setUser(medecin);
    //       console.log(medecin);
    //       axios.get(`${path}/api/appointment/doctor/${medecin["_id"]}`)
    //         .then((response) => {
              
    //           setDoctor(response.data[0].doctor);
    //           setData(response.data);
    //           setFiltredData(response.data);
    //         })
    //         .catch((error) => {
    //           console.error("Error fetching data:", error);
    //         });
     
    //   }, [medecin]);

    useEffect(() => {
        // Attendre 10 secondes avant de masquer le composant de chargement et afficher le texte
        const timeout = setTimeout(() => {
          setShowProgress(false);
          setShowText(true);
        }, 40000); // 10000 ms = 10 secondes
    
        return () => {
          clearTimeout(timeout); // Nettoyer le timeout si le composant est démonté avant la fin des 10 secondes
        };
      }, []);

        
      

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
    <h4 className='m-3'>Appointment List</h4>
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
        
              :
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
            }
          </tbody>
    </Table>
    </>
  )
}
