import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UserApi } from "./API"
import { Link } from "react-router-dom";

export function Home(){

    const navigate = useNavigate()
    const [firstname, setFirstname] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [datejoined,setDatejoined] = useState('')
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
                        setFirstname(res.data.first_name)
                        setEmail(res.data.email)
                        setUsername(res.data.username)
                        setDatejoined(res.data.date_joined)
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
                        <p className="logout" onClick={logout} > logout </p>
                        <img className="Img" alt="profile" height={200} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBwDrR96wTO6JVWXI3r-9DXqK85Qnr5M7_WQ&usqp=CAU" />
                        <p> { firstname && (<span> First Name {firstname} </span>)} {username && <span> Username - {username} </span>} {email && <span> EmailAddress - {email} </span>}  { datejoined && <span> Date Joined - {datejoined} </span>} </p>
                        </div>) 
            : <span> An authorization is required... <Link to='/login'> 🔒 </Link>  </span>}
        </div>
    )
}