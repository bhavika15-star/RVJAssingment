import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams} from "react-router-dom";

const accessToken = '7ba8bb364b836bdfd2608a2317f82fe76b253bda649f35f97086be437d09eada';
const apiUrl = `https://gorest.co.in/public-api/users`;

const headers = {
  Authorization: `Bearer ${accessToken}`,
  "Content-type": "application/json"
}

const EditUser = () => {
  let history = useHistory();
  const { id } = useParams();
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    gender: "",
    status: ""
  });

  const { name, email, gender, status } = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    await axios.put(`${apiUrl}/${id}`, user, { headers });
    history.push("/");
  };

  const loadUser = async () => {
    const result = await axios.get(`${apiUrl}/${id}`, { headers });
    setUser(result.data.data);
  };

  const styles = {
    textAlign: 'center',
    color: 'black',
    marginTop: '7rem',
    paddingTop: '0.8rem',
  }

  return (
    <div className="bg-danger m-5">
    <h1 style={styles}><strong><em>EDIT USER</em></strong></h1>
    <br></br>
    <div className="container m-7 alert bg-dark text-center text-white">
      <form onSubmit={e => onSubmit(e)}> 
        <div className="m-3 pl-6 ">
          <span htmlFor="id"><strong>ID: </strong></span>
          <input
                  
                  type="number"
                  name="id"
                  placeholder="ID"
                  value={id}
                  onChange={e => onInputChange(e)}
              />
        </div>
        <div className="m-3">
          <span htmlFor="name"><strong>Name:</strong> </span>
          <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={e => onInputChange(e)}
              />
        </div>
        <div className="m-3">
          <span htmlFor="email"><strong>Email:</strong> </span>
          <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={email}
              onChange={e => onInputChange(e)}
              />
        </div>
        <div className="m-3">
          <span htmlFor="gender"><strong>Gender:</strong> </span>
          <input                     
            type="text"
            name="gender"
            placeholder="gender"
            value={gender}
            onChange={e => onInputChange(e)}
            />
        </div>
        <div class="">
          <input  type="checkbox"
              name="status"
              value={status}
              onChange={e => onInputChange(e)} />
          <span htmlFor="check"> Status-Active </span>
        </div>
    
    <div className="pb-3 text-center">
          <button type="submit" onClick={onSubmit} className="btn btn-success btn-lg btn-dark btn-warning">Update User</button>
        </div>
        </form>
    </div>
  </div>

  );
};

export default EditUser;
