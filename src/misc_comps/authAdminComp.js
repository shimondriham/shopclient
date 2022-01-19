import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL, doApiGet } from '../services/apiService';

function AuthAdminComp(props){
  let nav = useNavigate();

  useEffect(() => {
    // check if there token in the browser
    if(localStorage["tok"]){
      doApi()
    }
    else{
      alert("You must be admin to be here! or you need to login again")
      nav("/admin")
    }
  },[])

  const doApi = async() => {
    let url = API_URL + "/users/myInfo";
    try{
      let resp = await doApiGet(url)
      // console.log(resp.data);
      // check if the token is of admin
      if(resp.data.role != "admin"){
        alert("You must be admin to be here! or you need to login again")
        nav("/admin")
      }
    }
    catch(err){
      // if there not token at all
      console.log(err.response);
      alert("You must be admin to be here! or you need to login again")
      nav("/admin")
      // if token invalid for admin

    }
  }
  // comp that will added to another comps where the user
  // must be an admin
  return(
    <React.Fragment></React.Fragment>
  )
}

export default AuthAdminComp