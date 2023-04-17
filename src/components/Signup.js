import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from './Alert'

const Signup = () => {

    const navigate = useNavigate()
    const [alert , setalert] = useState({
        status:false
    })
    const [cred , setcred] = useState({name:"",email:"",password:"",cpassword:""})

    const onchangehandle = (e)=>{
        setcred({...cred , [e.target.name]:e.target.value})
    }

    const onsubmit =async (e)=>{
        e.preventDefault()
        if(cred.password!==cred.cpassword){
            setalert({status:true,
                 message:"confirm password again"})
            setcred({cpassword:""})
        }else{
        let response = await fetch("http://localhost:5000/api/auth/signup",{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:cred.name ,email:cred.email , password:cred.password})
        })
        const token = await response.json()
        console.log(token)
        if(token.status==="ok"){
            console.log("ok")
        localStorage.setItem('token',token.auth_token)
        localStorage.setItem('loggedIn',true)
        console.log(token.auth_token)
        navigate('/')
        }else if(token.status==="error"){
            console.log("setalert run")
        setalert({
            status : true,
            message : token.error
        })
        setcred({name:"",email:"",password:"",cpassword:""})
        }else if(token.status==="validation-error"){
            setalert({
                status : true,
                message : `${token.errors[0].param} : ${token.errors[0].msg}`
            })
        }
    }
        
    }
    return (
        <>
        {alert.status&&<Alert message={alert.message} stat="danger" dismiss={setalert}/>}
        <div id="signup-component" className='pt-3 container w-50'>
            <form onSubmit={onsubmit}>
            <h1 className='my-3 text-center'>Signup</h1>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" onChange={onchangehandle} value={cred.name} name="name" id="floatingInput" placeholder="name"/>
                    <label htmlFor="floatingInput">Name</label>
            </div>
            <div className="form-floating mb-3">
                <input type="email" className="form-control" onChange={onchangehandle} value={cred.email} name="email" id="floatingInput" placeholder="name@example.com"/>
                    <label htmlFor="floatingInput">Email address</label>
            </div>
            
            <div className="form-floating mb-3">
                <input type="password" className="form-control" onChange={onchangehandle} value={cred.password} name="password" id="floatingPassword" placeholder="Password"/>
                    <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" onChange={onchangehandle} value={cred.cpassword} name="cpassword" id="floatingPassword" placeholder="Password"/>
                    <label htmlFor="floatingPassword">Confirm Password</label>
            </div>
            <div className='my-3 text-center'>
            <button className="btn btn-dark " type='submit'>Signup</button>
            </div>
            </form>
        </div>
        </>
    )
}

export default Signup
