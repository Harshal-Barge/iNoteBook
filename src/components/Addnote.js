import React,{useContext,useEffect} from 'react'
import noteContext from '../contexts/noteContext/noteContext'

const Addnote = () => {
    const {addnote,getnotes} = useContext(noteContext);
    const addnewnote=()=>{
       let title= document.getElementById('title').value
       let desc= document.getElementById('description').value
       let tag= document.getElementById('tag').value
       addnote(title,desc,tag)
        document.getElementById('title').value=""
        document.getElementById('description').value=""
        document.getElementById('tag').value=""
    }
    useEffect(() => {
       getnotes()
       // eslint-disable-next-line
    }, [])
    
    return (
        <div> 
            <button type="button" className="btn btn-dark round-btn" id="addnote-btn" data-bs-toggle="modal" data-bs-target="#exampleModal1"><i className="fas fa-plus"></i></button>

            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="title-modal" className="form-label">Title</label>
                                <input type="text" className="form-control" id="title" aria-describedby="emailHelp" />

                            </div>
                            <div className="mb-3">
                                <label htmlFor="description-modal" className="form-label">Description</label>
                                <input type="text" className="form-control" id="description" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tag-modal" className="form-label">Tag</label>
                                <input type="text" className="form-control" id="tag" />
                            </div>
                
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-dark" onClick={addnewnote}>Add Note</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Addnote