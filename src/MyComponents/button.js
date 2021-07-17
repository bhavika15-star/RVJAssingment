import React from 'react';

import {Link} from 'react-router-dom';

function Buttons() {
  return (
    <div style={{paddingLeft: '80vw', backgroundColor: 'red'}} className="">
      <Link to={'/new'} className = "btn btn-dark btn-info btn-lg">New User</Link>
    </div>
  );
}
export default Buttons;