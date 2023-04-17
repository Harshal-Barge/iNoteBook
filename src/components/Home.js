import React,{useContext} from 'react'
import Addnote from './Addnote'
import Notes from './Notes'
import Notemodal from './Notemodal'
import noteContext from '../contexts/noteContext/noteContext'
import { useNavigate } from 'react-router-dom'


const Home = () => {
    const context = useContext(noteContext)
    const { notes }=context
    const navigate = useNavigate()
    return (
        <div className='container mt-5 py-3'>
            <Addnote/>
            <Notemodal/>
            {!notes.error?<Notes/>:navigate('/login')}
        </div>
    )
}

export default Home
