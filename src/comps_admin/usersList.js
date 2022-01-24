import React, { useEffect , useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthAdminComp from '../misc_comps/authAdminComp';
import { API_URL, doApiGet, doApiMethod } from '../services/apiService';

function UsersList(props){
  let [ar,setAr] = useState([]);
  let nav = useNavigate()

  useEffect(() => {
    doApi()
  },[])

  const doApi = async() =>{
    let url = API_URL + "/users/usersList";
    try{
      let resp = await doApiGet(url);
      // console.log(resp.data);
      setAr(resp.data);
    }
    catch(err){
      alert("there problem come back later")
      if(err.response){
        console.log(err.response.data)
      }
    }
  }

  const delUser = async(_idDel) => {
    
  }

  // change role user for admin or back to regular user
  const changeRole = async(_userId,_role) => {
    let url = API_URL + `/users/changeRole/${_userId}/${_role}`;
    try{
      let resp = await doApiMethod(url,"PATCH",{});
      if(resp.data.modifiedCount){
        doApi();
      }
    }
    catch(err){
      alert("there problem come back later")
      if(err.response){
        console.log(err.response.data)
      }
    }
  }
 
  return(
    <div className='container'>
      <AuthAdminComp />
      <h1>List of Users in system</h1>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>email</th>
            <th>address</th>
            <th>role</th>
            <th>del</th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item,i) => {
            return(
              <tr key={item._id}>
                <td>{i+1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
                <td>
                  {(item.role === "admin") ? 
                  <button onClick={() => {
                    changeRole(item._id, "user")
                  }} className='btn btn-warning'>admin</button> 
                  : 
                  <button 
                  onClick={() => {
                    changeRole(item._id, "admin")
                  }} 
                  className='btn btn-dark'>user</button>
                }
                  
                  </td>
                <td>
                  <button onClick={() => {delUser(item._id)}} className='badge bg-danger'>X</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {ar.length === 0 ? <h2>Loading...</h2> : ""}
      </div> 
  )
}

export default UsersList;