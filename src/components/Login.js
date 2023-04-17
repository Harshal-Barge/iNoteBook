import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import Alert from './Alert'


const Login = () => {
    const [cred , setcred] = useState({email:"",password:""})
    const [alert , setalert] = useState({status:false})
    let navigate = useNavigate();
    const onchangehandle = (e)=>{
        setcred({...cred , [e.target.name]:e.target.value})
    }
    const onsubmit =async (e)=>{
        e.preventDefault()
        let response = await fetch("http://localhost:5000/api/auth/login",{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:cred.email , password:cred.password})
        })
        const token = await response.json()
        if(token.success){
            localStorage.setItem('token',token.auth_token)
            localStorage.setItem('loggedIn',true)
            navigate('/')
        }else{
            // alert("invalid credential")
            setalert({
                status : true,
                message : "invalid credintials"
            })
        }
    }
    return (
        <>
            {alert.status&&<div className='my-5'><Alert message={alert.message} dismiss={setalert} stat="danger"/></div>}
        <div className='pt-3 container w-50' id="login-component">
            <form onSubmit={onsubmit}>
            <h1 className='my-3 text-center'>Login</h1>
            <div className="form-floating mb-3">
                <input type="email" className="form-control" id="login-email" placeholder="name@example.com" name="email" onChange={onchangehandle}/>
                    <label htmlFor="login-email">Email address</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" id="login-password" placeholder="Password" name="password" onChange={onchangehandle}/>
                    <label htmlFor="login-password">Password</label>
            </div>
            <div className='my-3 text-center'>
            <button className="btn btn-dark " type='submit'>Login</button>
            </div>
            </form>
        </div>
        </>
    )
}

export default Login
