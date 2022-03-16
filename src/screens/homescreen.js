import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UserApi } from "./API"
import { Link } from "react-router-dom";

export function Home(){

    const navigate = useNavigate()
    const [data, setData] = useState('')
    const [allowUser, setAllowUser] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(async () =>{
        if(localStorage.getItem('user-token'))
        {    
            const token = window.atob(localStorage.getItem('user-token')) 
            if(token)
            {
                setLoading(true)
                await axios.get(UserApi,{headers:{'Authorization':`token ${window.atob(localStorage.getItem('user-token'))}`}})
                .then(res=>{
                    if(res.data)
                    {
                        setLoading(false)
                        setAllowUser(true)
                        console.log(res.data)
                        setData(res.data)
                    }
                    else{
                        setLoading(false)
                        console.log('unable to fetch user details')
                    }
                })
                .catch( err=>{
                    setLoading(false)
                    navigate('/login')
                    console.log(err.message)})
            }else{
                setLoading(false)
                console.log('please relogin')
            }

        }else{
            setLoading(false)
            navigate('/login')
            console.log('please login to see proper details')
        }
    },[])

    function logout()
    {
        localStorage.removeItem('user-token')
        navigate('/login')
    }

    return(
        <div className="center">
          { loading ? <img src="https://media1.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif" alt="loading" /> : allowUser ? ( <div className="sub-container">
                        <p className="logout" onClick={logout} > <i class="fa fa-sign-out" aria-hidden="true"></i> logout </p>
                        <img className="Img" alt="profile" height={200} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBwDrR96wTO6JVWXI3r-9DXqK85Qnr5M7_WQ&usqp=CAU" />
                        <p> { data.firstname && (<span> First Name {data.firstname} </span>)} {data.username && <span> Username - {data.username} </span>} {data.email && <span> EmailAddress - {data.email} </span>}  { data.date_joined && <span> Date Joined - {data.date_joined} </span>} </p>
                        </div>)             
            : <span> An authorization is required... <Link to='/login'> 🔒 </Link>  </span>}
        
        </div>
    )
}