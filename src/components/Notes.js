import React,{ useContext , useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../contexts/noteContext/noteContext'
import Noteitem from './Noteitem'
import Empty from '../icons/mt.png'

const Notes = () => {
    const context = useContext(noteContext)
    const { notes , getnotes }=context
    const navigate = useNavigate()
    useEffect(() => {
        if(localStorage.getItem('loggedIn')){
            getnotes()
        }else{
            navigate('/login')
        }
    }, [])
    return (
        <div>
            {notes.length===0?<div className='d-flex justify-content-center'><img className="mx-auto d-block" id="noting" src={Empty} alt="" /></div>:
            notes.map((note)=>{
                    return <Noteitem key={note._id} Note={note}/>
            })}
        </div>
    )
}

export default Notes
