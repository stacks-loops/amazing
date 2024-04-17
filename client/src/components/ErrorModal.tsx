import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'

interface ErrorModalProps {
    message: string;
    onClose: () => void;
}

function ErrorModal({ message, onClose }: ErrorModalProps) {
    return (
        <div className="modal fade show" style={{ display: "block"}}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Error</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>{message}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default ErrorModal;