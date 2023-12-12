import React, {useState} from 'react'
import { Link , useNavigate} from 'react-router-dom'

export default function Login() {
  const[credentails, setcerdentails] = useState({name:"",email:"",password:"",geolocation:""})
  let navigate = useNavigate()
    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5001/api/loginuser",{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({email:credentails.email,password:credentails.password})
        });
        const json = await response.json()
        console.log(json);
        if(!json.success){
            alert("Enter Valid Cerdentails")
        }
        if(json.success){
          localStorage.setItem("userEmail",credentails.email);
          localStorage.setItem("authToken",json.authToken);
          console.log(localStorage.getItem("authToken"))
          navigate("/");
        }
    }
    const onChange=(event)=>{
        setcerdentails({...credentails,[event.target.name]:event.target.value})
    }
  return (
    <div>
      <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' value={credentails.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={credentails.password} onChange={onChange} id="exampleInputPassword1" />
                </div>
                <button type="submit" className="m-3 btn btn-outline-success">Submit</button>
                <Link to ="/createuser" role='button' className='m-3 btn btn-outline-primary'>I'm new user</Link>
            </form>
            </div>
    </div>
  )
}
