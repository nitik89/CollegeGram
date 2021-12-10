


import React from 'react'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { axiosIntance } from "../../config";
import "./display.css";

import "../loader.css";
import Topbar from '../topbar/Topbar';
function Display() {
const [dataz,setdata]=useState([]);
const [loading,setLoading]=useState(true);
    const { user } = useContext(AuthContext);
    useEffect(()=>{
        const fetchIt= async ()=>{
            try{
                const mydata = await axiosIntance.get("/auth/companies/");
                console.log(mydata.data);
                setdata(mydata.data);
                setLoading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        fetchIt();
        
     
    },[user._id]);
    return (<>
        <Topbar/>
        <div className="firstname">
           
            <h1>JOBS DETAIL</h1>
            {loading?(<div className="loader">Loading...</div>):(
<> {dataz.map(dt=>(
                <div className="inner">
                    <h4>{dt.data}</h4>
                    <a href={dt.link}>{dt.link}</a>
                    
                </div>
            ))}</>
            )  }

           
        </div>
        </>
    )
}

export default Display
