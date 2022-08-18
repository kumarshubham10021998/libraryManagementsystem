import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './Utils/Common';
import { Link } from 'react-router-dom';

function Users(props) {
  const [loading, setLoading] = useState(false);
  const email = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post('http://powerful-temple-78847.herokuapp.com/user/login ', { email: email.value, password: password.value }).then(response => {
      setLoading(false);
      setUserSession(response.data.token, response.data.user);
      props.history.push('/dashboard');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }
// const handleRig =() =>{
//     setError(null);
//     setLoading(true);
//     axios.post('http://powerful-temple-78847.herokuapp.com/admin/login', { email: email.value, password: password.value }).then(response => {
//       setLoading(false);
//       setUserSession(response.data.token, response.data.user);
//       props.history.push('/registration');
//     }).catch(error => {
//       setLoading(false);
//       if (error.response.status === 401) setError(error.response.data.message);
//       else setError("Something went wrong. Please try again later.");
//     }); 
// }
  return (
    <div className='text-light   p-5 border' style={{backgroundImage: `url("assets/img/2.jpg")`}}>
     Users Login<br /><br />
      <div className='text-primary'>
        Username<br />
        <img src='assets/img/2.jpg' height="300px" style={{position:'absolute', left:'350px',top:'140px',width:'350px'}}/>
        <input type="text" {...email} autoComplete="new-password" />
      </div>
      <div className='text-primary' style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input className='btn btn-outline-light' type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} />
      {/* <a className='text-primary ms-5' type="button" value={loading ? 'Loading...' : 'Registration'}  disabled={loading} </a> */}
      <Link className=' btn btn-outline-light ms-5' to='/registration' type="button">Registration</Link>
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Users;