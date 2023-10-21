import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useUserData } from '../../contexts/UserDataContext';

import { FaUserSecret, FaUser, FaUserMd, FaCalendarCheck, FaStethoscope } from 'react-icons/fa'; // Importation des icônes

import './style.css';
import Transition from '../../constants/transition';

function DashboardInfos() {

    // const { rdvs, patients, medecins, maladies, secretaires } = useUserData();
    
    // return (
    //     <Transition>
    //         <Container className='dashboard-container'>
    //             <Row>
    //                 <Col lg={4}>
    //                     <Card className='card secretary-card'>
    //                         <Card.Header className='head'>
    //                             <FaUserSecret  /> SECRETARIES
    //                         </Card.Header>
    //                         <Card.Body className='card-number'>
    //                             {secretaires.length}
    //                         </Card.Body>
    //                     </Card>
    //                 </Col>
    //                 <Col lg={4}>
    //                     <Card className='card patient-card'>
    //                         <Card.Header className='head'>
    //                             <FaUser /> PATIENTS
    //                         </Card.Header>
    //                         <Card.Body className='card-number'>
    //                             {patients.length}
    //                         </Card.Body>
    //                     </Card>
    //                 </Col>
    //                 <Col lg={4}>
    //                     <Card className='card doctor-card'>
    //                         <Card.Header className='head'>
    //                             <FaUserMd /> DOCTORS
    //                         </Card.Header>
    //                         <Card.Body className='card-number'>
    //                             {medecins.length}
    //                         </Card.Body>
    //                     </Card>
    //                 </Col>
    //             </Row>
    //             <Row style={{ marginTop: '10px' }}>
    //                 <Col lg={6}>
    //                     <Card className='card appointment-card'>
    //                         <Card.Header className='head'>
    //                             <FaCalendarCheck /> APPOINTMENTS
    //                         </Card.Header>
    //                         <Card.Body className='card-number'>
    //                             {rdvs.length}
    //                         </Card.Body>
    //                     </Card>
    //                 </Col>
    //                 <Col lg={6}>
    //                     <Card className='card disease-card'>
    //                         <Card.Header className='head'>
    //                             <FaStethoscope /> DISEASES
    //                         </Card.Header>
    //                         <Card.Body className='card-number'>
    //                             {maladies.length}
    //                         </Card.Body>
    //                     </Card>
    //                 </Col>
    //             </Row>
    //         </Container>
    //     </Transition>
    // )

  const {numberOfSecretaries, numberOfPatients, numberOfDoctors, numberOfAppointments, numberOfDiseases } = useUserData();

  return (
    <Transition>
      <Container className='dashboard-container'>
        <Row>
          <Col lg={4}>
            <Card className='card'>
              <Card.Header className='head'>SECRETARY</Card.Header>
              <Card.Body className='card-number'>
                {numberOfSecretaries}
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className='card'>
              <Card.Header className='head'>PATIENTS</Card.Header>
              <Card.Body className='card-number'>
                {numberOfPatients}
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className='card'>
              <Card.Header className='head'>DOCTORS</Card.Header>
              <Card.Body className='card-number'>
                {numberOfDoctors}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: '10px' }}>
          <Col lg={6}>
            <Card className='card'>
              <Card.Header className='head'>APPOINTMENTS</Card.Header>
              <Card.Body className='card-number'>
                {numberOfAppointments}
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6}>
            <Card className='card'>
              <Card.Header className='head'>DISEASE</Card.Header>
              <Card.Body className='card-number'>
                {numberOfDiseases}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Transition>
  );

}


export default DashboardInfos;
