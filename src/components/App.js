
// import React from "react";
// import './../styles/App.css';

// const App = () => {
//   return (
//     <div>
//         {/* Do not remove the main div */}
//     </div>
//   )
// }

// export default App

import React, { useState } from "react";
import axios from "axios";
import './../styles/App.css';

const API_KEY = "YOUR_API_KEY"; // Replace with your actual API key from reqres.in

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  const fetchUsers = () => {
    setLoading(true);
    setFetched(false);
    axios.get("https://reqres.in/api/users", {
      headers: {
        "API-Key": API_KEY,
      }
    })
      .then(res => {
        setUsers(res.data.data || []);
        setLoading(false);
        setFetched(true);
      })
      .catch(() => {
        setUsers([]);
        setLoading(false);
        setFetched(true);
      });
  };

  return (
    <div>
      <button className="btn" onClick={fetchUsers}>Get User List</button>

      {loading && <p>Loading...</p>}

      {!loading && fetched && (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Avatar</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map(user => (
                <tr key={user.id}>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>
                    <img src={user.avatar} alt={`${user.first_name} avatar`} width="50" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
      
