import React,{ useEffect,useState,useContext } from "react";
import {UserContext} from "./App";

function Profile(){
    const [mypics,setpics]=useState([]);
     const {state,dispatch}=useContext(UserContext);
     useEffect(()=>{
         async function fetchData(){
       const res= await fetch('/myposts');
      const result=await res.json(); 
           await setpics(result);
         }
         fetchData();
    },[])

 return (
 <div style={{maxWidth:"550px",margin:"0px auto"}}>
     <div className="profile">
     <div>
         <img className="profile-img" src="https://images.unsplash.com/photo-1575632312417-71da8ed4992d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="profileimage"/>
     </div>
     <div className="profile-content">
     <h4>{state?state.name:"loading"}</h4>
     <h5>{state?state.email:"loading"}</h5>
         <div style={{display:"flex",justifyContent:"space-between", width:"108%"}}>
          <h6>{mypics.length} posts</h6>
          <h6>{state?state.followers.length:"0"} followers</h6>
          <h6>{state?state.following.length:"0"} following</h6>
         </div>
     </div>
     </div>
     <div className="gallery">
     {
         mypics.map(item=>{
            return <img className="item" src={item.photo} key={item._id} alt={item.caption}/>
         })
     }
          
     </div>
    
 </div>
    )
}

export default Profile;