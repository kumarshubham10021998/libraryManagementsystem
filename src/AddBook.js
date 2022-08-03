import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom";

const AddBook = () => {

    let history = useHistory();
    const [user, setUser] = useState({
      name: "",
      author_name: "",
      publication_name: "",  
      no_of_pages: "",
      published_date: ""
    });
  
    const { name, author_name, publication_name, no_of_pages, published_date } = user;
    const onInputChange = e => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };
  
    const onSubmit = async e => {
        
      e.preventDefault();
      const token = (sessionStorage.getItem('token'));
      await axios.post("http://powerful-temple-78847.herokuapp.com/book/create", user,{ headers: {"Authorization" : `Bearer ${token}`} });
      history.push("/dashboard");
    };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A Book</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Name"
              name="name"
              value={name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Author Name"
              name="author_name"
              value={author_name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Publication Name"
              name="publication_name"
              value={publication_name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your NO.of Pages"
              name="no_of_pages"
              value={no_of_pages}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Published Date"
              name="published_date"
              value={published_date}
              onChange={e => onInputChange(e)}
            />
          </div>
          <button className="btn btn-primary btn-block">Add Book</button>
        </form>
      </div>
    </div>
  )
}

export default AddBook
