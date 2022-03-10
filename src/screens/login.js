import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { LoginApi } from './API'

export function Login(){

    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [feedback, setFeedback] = useState('') //alert to show the error

    async function submit()
    {
        if(username && password)
        {           
            let character =  password.match(/[a-zA-z]/g) ? password.match(/[a-zA-z]/g).length : 0  // count the length of the characters in given password
            let num =  password.match(/[0-9]/g) ? password.match(/[0-9]/g).length : 0   // count the length of the numbers in given password
            if(num>=3 && character>=8)
            {
                await axios.post(LoginApi,{
                    username,
                    password
                })
                .then(res=>{
                    localStorage.setItem('user-token',window.btoa(res.data.token)) //encoded the token
                    setFeedback('')
                    navigate('/')
                })
                .catch(err=>setFeedback('Username and Password not found'))
            }else{
                setFeedback('Password should match more than 8 characters and more than 3 numbers')
            }
           
        }else{
            setFeedback('Please enter the required fields')
        }
    }

    return(
        <div className='center'>   
            <h1> Demo Login </h1>
            <input type="text" placeholder='Enter the username' onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder='Enter the password' onChange={(e) => setPassword(e.target.value)} />
            <button onClick={submit}> submit </button>
            <p> {feedback && feedback } </p>
        </div>
    )   
}

