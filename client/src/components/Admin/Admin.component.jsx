import React, { useEffect, useState } from "react";
import axios from "axios";

function Admin(props) {
  // const [users, setUsers] = useState({});

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await axios.get(`http://localhost:4000/users`);
  //       // console.log("Registered user:", res.data);
  //       setUsers(res);
  //       // users.map((u, i) => ( console.log(u)))
  //     } catch (err) {
  //       console.log("Error fetching users:", err.response.data);
  //     }
  //   })();
  // }, []);

  // console.log(users.data);
  //isn't there a better way than pushing to an array!?
  // const usersArr = [];
  // for (const key in users.data) {
  //   if (Object.hasOwnProperty.call(users.data, key)) {
  //     const element = users.data[key];
  //     usersArr.push(element);
  //   }
  // }

  return (
      <div>this is admin</div>
  );
}

export default Admin;

    // <div>
    //   <button>update Users</button>
    //   {usersArr.map((u) => (
    //     <div key={u._id}>
    //       <div>{u.username} - {u.email} - {u.password}</div>
    //     </div>
    //   ))}
    // </div>