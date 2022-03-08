import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiGet } from '../services/apiService';



function AuthAdminComp(props){
  let nav = useNavigate();
  useEffect(() => {
    if(localStorage["tok"]){
      doApi()
    }
    else{
      toast.error("You must be admin to be here! or you need to login again")
      nav("/admin")
    }
  },[])


  const doApi = async() => {
    let url = API_URL + "/users/myInfo";
    try{
      let resp = await doApiGet(url)
      if(resp.data.role != "admin"){
        toast.error("You must be admin to be here! or you need to login again")
        nav("/admin/logout")
      }
    }
    catch(err){
      alert("You must be admin to be here! or you need to login again")
      nav("/admin/logout")
    }
  }


  return(
    <React.Fragment></React.Fragment>
  )
}

export default AuthAdminComp