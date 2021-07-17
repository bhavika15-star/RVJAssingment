import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";

const accessToken = '7ba8bb364b836bdfd2608a2317f82fe76b253bda649f35f97086be437d09eada' ;
const apiUrl = `https://gorest.co.in/public-api/users`;

const headers = {
  Authorization: `Bearer ${accessToken}`,
  "Content-type": "application/json"
}

const Home = () => {
  const [users, setUser] = useState([]);

  const [page, setPage] = useState([]);
  const [currentPage, setCurrentPage ] = useState(0);
  const pageCount = page;
  

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get(`${apiUrl}`,{ params : { page : 1 }});
    setUser(result.data.data);
    setPage(result.data.meta.pagination.pages);
  };
  
  const handelPageClick = ({selected: selectedPage}) => {
    const originalPage = selectedPage + 1;
    axios.get(`${apiUrl}`,{ params : { page : originalPage }})
      .then(function(result) {
        console.log(result.data.data) 
        setUser(result.data.data);
        setPage(result.data.meta.pagination.pages);
    })
  };


  const deleteUser = async id => {
    await axios.delete(`${apiUrl}/${id}`,{ headers })
    .catch(err => console.log('err', err));
    loadUsers();
  };

  const tablebody = users.map((item, index) => {
    return (
      <tr key={item.id}>
        <td style={{ border: "1px solid black", width: '20%' }}>{item.id}</td>
        <td style={{ border: "1px solid black", width: '40%' }}>{item.name}</td>
        <td style={{ border: "1px solid black", textAlign: 'center' }}>
          <Link to={`/${item.id}`} className="btn m-2 btn-info btn-danger btn-success" > Show  </Link>
          <Link to={`/edit/${item.id}`} className="btn m-2 btn-info btn-danger"> Edit  </Link>
          <Link onClick={() => deleteUser(item.id)} className="btn m-2 btn-info btn-danger btn-success"> Delete</Link>
        </td>
      </tr>
    )
  })
   
  return (
      <div className="pt-5" style={{backgroundColor: "pink"}}>
      <table className="container-xxl table  table-bordered table-fixed table-dark">
        <thead>
          <tr>
            <th scope="col" style={{color: 'black', backgroundColor:'red', border: "1px solid black", fontSize: "25px", fontWeight: "bold" }}>ID</th>
            <th scope="col" style={{color: 'black', backgroundColor:'red', border: "1px solid black", fontSize: "25px", fontWeight: "bold" }}>Name</th>
            <th scope="col" style={{color: 'black', backgroundColor:'red', border: "1px solid black", fontSize: "25px", fontWeight: "bold" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {tablebody}
        </tbody>
      </table>
      <div className = "paginate-container">
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={4}
          disableInitialCallback={ true }
          onPageChange={handelPageClick}
          containerClassName="pagination"
          activeClassName="active"
          pageLinkClassName="page-link"
          breakLinkClassName="page-link"
          nextLinkClassName="page-link"
          previousLinkClassName="page-link"
          pageClassName="page-item"
          breakClassName="page-item"
          nextClassName="page-item"
          previousClassName="page-item"
          previousLabel={"<"}
          nextLabel={">"}
        />
      </div>
    </div>
  
      
      
      

    
  );
};

export default Home;