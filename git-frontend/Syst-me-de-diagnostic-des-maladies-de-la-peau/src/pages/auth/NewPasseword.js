import React, { useState } from 'react';
import {useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useUserData } from '../../contexts/UserDataContext';

function PasswordChange() {
  const token = useParams()
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {path} = useUserData()

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };


  const handleSubmitData = async() =>{
    console.log(token);
    console.log(newPassword)
    try {
      if(newPassword === confirmPassword){
        const requestData = {
          new_password : newPassword
        }
        const config ={
          headers: {
            "Content-Type": "application/json",
          },
        }
        const encodedToken = encodeURIComponent(token.token)
        let response = await axios.post(`${path}/reset_password/${encodedToken}`,requestData,config)
        if (response.status ===200) {
          console.log("success");
          alert("good")
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">Change the password</div>
            <div className="card-body">
              <div className="form-group">
                <label>New password :</label>
                <input
                  type="password"
                  className="form-control"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
              </div>
              <div className="form-group">
                <label>Confirm password :</label>
                <input
                  type="password"
                  className="form-control"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
              <button onClick={handleSubmitData} className="btn btn-primary">
              Change password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordChange;
