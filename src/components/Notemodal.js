import React, { useContext } from 'react'
import noteContext from '../contexts/noteContext/noteContext'


const Notemodal = () => {
    
    const {updatenote,modal} = useContext(noteContext)
 
    return (
        <div>
            <button type="button" className="btn btn-primary mt-3 d-none" ref={modal} data-bs-toggle="modal" data-bs-target="#exampleModal">
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="title-modal" className="form-label">Title</label>
                                <input type="text" className="form-control" id="title-modal" aria-describedby="emailHelp" />

                            </div>
                            <div className="mb-3">
                                <label htmlFor="description-modal" className="form-label">Description</label>
                                <input type="text" className="form-control" id="description-modal" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tag-modal" className="form-label">Tag</label>
                                <input type="text" className="form-control" id="tag-modal" />
                            </div>
                
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-dark" onClick={updatenote}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notemodal
