import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
const Edit = () => {
  let edit_data = sessionStorage.getItem("edit")
    let history = useHistory();
    const { id } = useParams();
    const [user, setUser] = useState(edit_data);
  
    const { name, author_name, publication_name, no_of_pages, published_date} = user;
    const onInputChange = e => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };
  
    useEffect(() => {
      loadUser();
    }, []);
  
    const onSubmit = async e => {
      e.preventDefault();
      const token = (sessionStorage.getItem('token'));
      await axios.put(`http://powerful-temple-78847.herokuapp.com/book/update/${id}`, user,{ headers: {"Authorization" : `Bearer ${token}`} });
      history.push("/dashboard");
    };
  
    const loadUser = async () => {
      const token1 = (sessionStorage.getItem('token'));
      const result = await axios.get(`http://powerful-temple-78847.herokuapp.com/book/update/${id}`, user,{ headers: {"Authorization" : `Bearer ${token1}`} });
      console.log(result)
      setUser(result.data.books);
    };
  return (
    <div className="container">
    <div className="w-75 mx-auto shadow p-5">
      <h2 className="text-center mb-4">Edit A Book</h2>
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
            type="publication_name"
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
            placeholder="Enter Your Nummber of pages"
            name="no_of_pages"
            value={no_of_pages}
            onChange={e => onInputChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter Your Published date"
            name="published_date"
            value={published_date}
            onChange={e => onInputChange(e)}
          />
        </div>
        <button className="btn btn-warning btn-block">Update User</button>
      </form>
    </div>
  </div>
  )
}

export default Edit
