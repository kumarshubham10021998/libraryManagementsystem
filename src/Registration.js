import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './Utils/Common';

function Registration(props) {
    const [loading, setLoading] = useState(false);
    const name = useFormInput('');
    const email = useFormInput('');
    const password = useFormInput('');
    const [error, setError1] = useState(null);

    // handle button click of login form
    const handleLogin1 = () => {
        setError1(null);
        setLoading(true);
        axios.post('https://powerful-temple-78847.herokuapp.com/user/register', { name: name.value, email: email.value, password: password.value }).then(response => {
            setLoading(false);
            setUserSession(response.data.token, response.data.user);
            props.history.push('/user-login');
        }).catch(error => {
            setLoading(false);
            if (error.response.status === 401) setError1(error.response.data.message);
            else setError1("Something went wrong. Please try again later.");
        });
    }

    return (
        <div className='text-info p-5 bg bg-success border' style={{ backgroundImage: `url("assets/img/2.jpg")` }} >
            Registration<br /><br />
            <div className='text-light font-weight-bold '>
                Full Name<br />
                <input type="text" {...name} autoComplete="new-password" />
            </div>
            <div className='text-light font-weight-bold '>
                User Name<br />
                <input type="text" {...email} autoComplete="new-password" />
            </div>
            <div className='text-light font-weight-bold ' style={{ marginTop: 10 }}>
                Password<br />
                <input type="password" {...password} autoComplete="new-password" />
            </div>
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
            <input type="button" value={loading ? 'Loading...' : 'Submit'} onClick={handleLogin1} disabled={loading} /><br />
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

export default Registration;