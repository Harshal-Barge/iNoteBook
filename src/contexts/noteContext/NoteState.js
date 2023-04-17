import { useState, useRef } from "react";
import noteContext from "./noteContext";


const NoteState =(props)=>{
    const modal = useRef(null)
    const [notes, setnotes] = useState([])
    let id = null
    const getnotes= async ()=>{
        let response = await fetch('http://localhost:5000/api/notes/fetchnotes',{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const json=await response.json()
        setnotes(json)
    }

    const addnote= async (title,description,tag)=>{
        try{
        let url='http://localhost:5000/api/notes/addnotes'
        let newnote = await  fetch(url,{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        })
        getnotes()
        document.getElementById('addnote-btn').click()
    }catch(error){
        console.log(error.message)
    }
    }

    const deletenote= async (id)=>{
        let url = `http://localhost:5000/api/notes/deletenote/${id}`
        let newnotes = await fetch(url,{
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
                }
        })
        getnotes()
    }

    const updatenote = async ()=>{
        let title= document.getElementById('title-modal').value
        let description= document.getElementById('description-modal').value
        let tag= document.getElementById('tag-modal').value
        let url = `http://localhost:5000/api/notes/updatenotes/${id}`
        let newnotes = await fetch(url,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title,description})
        })
        modal.current.click()
        getnotes()
    }
    const togglenote = (note)=>{
        document.getElementById('title-modal').value = note.title
        document.getElementById('description-modal').value = note.description
        document.getElementById('tag-modal').value = note.tag
        modal.current.click()
        id = note._id
    }
    return(
        <noteContext.Provider value={{notes,setnotes,addnote,deletenote,getnotes,updatenote,togglenote,modal}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;