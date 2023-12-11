import React, { useState, useEffect } from 'react';
import LoginForm from '../auth/LoginForm'
import ScaleLoader from "react-spinners/ScaleLoader";

export default function Login () {

  let [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
        

    }, []);

  return (


    loading ? <div className="flex justify-center items-center h-screen"><ScaleLoader color="#264653" loading={loading} size={150} /></div> :
  
    <LoginForm />
  )
}