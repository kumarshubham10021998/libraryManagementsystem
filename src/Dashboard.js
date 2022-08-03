import React,{ useState, useEffect }  from 'react';
import { getUser, removeUserSession } from './Utils/Common';
import axios from "axios";
import { Link } from "react-router-dom";


function Dashboard(props) {
  const user = getUser();

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }
  const [users, setUser] = useState([]);
  
  //  const token2 = token.token;
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const token = (sessionStorage.getItem('token'));
    const result = await axios.get("http://powerful-temple-78847.herokuapp.com/book/getall_admin ",{ headers: {"Authorization" : `Bearer ${token}`} });

    console.log(result)
    setUser(result.data.books.reverse());
  };

 

  return (
    <div>
     
      <input className='btn btn-primary ' type="button" onClick={handleLogout} value="Logout" />
      
      
      <div className="container">
      <div className="py-4">
        <h1>Books List</h1>
        <table className="table border shadow">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Author Name</th>
              <th scope="col">Publication Name</th>
              <th scope="col">NO.of Pages</th>
              <th scope="col">Published Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user1, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user1.name}</td>
                <td>{user1.author_name}</td>
                <td>{user1.publication_name}</td>
                <td>{user1.no_of_pages}</td>
                <td>{user1.published_date}</td>
                <td>
                  <Link class="btn btn-primary mr-2" to={`/users/${user1.id}`}>
                    View
                  </Link>
                  <Link
                    class="btn btn-outline-primary mr-2"
                    to={`/users/edit/${user1._id}`}
                  >
                    Edit
                  </Link>
                 
                </td>
              </tr>
            ))}
          </tbody>
          </table>
          </div>
          </div>


    </div>
  );
}

export default Dashboard;
