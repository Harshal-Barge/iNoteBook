import React,{useContext} from 'react'
import noteContext from '../contexts/noteContext/noteContext'

const Noteitem = (props) => {
    const {deletenote,togglenote}=useContext(noteContext)
    const deletemynote=()=>{
        deletenote(props.Note._id)
    }
    const updatemynote = ()=>{
        togglenote(props.Note)
    }
    return (
        <div className="container">
            <div className="card my-3">
                <div className="card-body">
                    <div className='d-flex justify-content-between'>
                    <h5 className="card-title">{props.Note.title}</h5>
                    <div>
                    <a onClick={deletemynote}><i className="fas fa-trash mx-3"></i></a>
                    <a onClick={updatemynote}><i className="fas fa-edit"></i></a>
                    </div>
                    </div>
                    <p className="card-text">{props.Note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
