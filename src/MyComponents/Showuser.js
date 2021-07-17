import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const accessToken = '7ba8bb364b836bdfd2608a2317f82fe76b253bda649f35f97086be437d09eada' ;
const apiUrl = `https://gorest.co.in/public-api/users`;

const headers = {
  Authorization: `Bearer ${accessToken}`,
  "Content-type": "application/json"
}

const Showuser = () => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    gender: "",
    status: ""
  });
  const { id } = useParams();
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    const res = await axios.get(`${apiUrl}/${id}`,{ headers })
    setUser(res.data.data);
  };

  const styles = {
    textAlign: 'center',
    color: 'red',
    marginTop: '7rem',
    paddingTop: '0.8rem',
  }
  return (
    <div className="bg-dark m-5">
      <h1 style={styles}><strong><em>USER</em></strong></h1>
      <br></br>
      <div className="container m-7 alert alert-primary text-center">
        <div className="m-3 pl-6">
            <span htmlFor="id"><strong>ID: {user.id} </strong></span>
          </div>
          <div className="m-3">
            <span htmlFor="name"><strong>Name: {user.name} </strong> </span>
          </div>
          <div className="m-3">
            <span htmlFor="email"><strong>Email:</strong> {user.email} </span>
          </div>
          <div className="m-3">
            <span htmlFor="gender"><strong>Gender:</strong> {user.gender}</span>
          </div>
          <div class="form-check m-3">
          <span htmlFor="status"><strong>Status:</strong> {user.status}</span>
          </div>
        
      </div>
    </div>
  );
}


export default Showuser;