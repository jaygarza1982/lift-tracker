import React from 'react';
import { useState } from 'react';

const Modal = ({title, message, open, setOpen, saveAction}) => {

    const closeModal = () => {
        setOpen(false);
    }

    return (
        <div className={`modal ${open ? 'is-active' : ''}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{title}</p>
                    <button className="delete" aria-label="close" onClick={closeModal}></button>
                </header>
                <section className="modal-card-body">
                    {message}
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-success" onClick={saveAction}>
                        Yes
                    </button>
                    <button className="button" onClick={closeModal}>
                        Cancel
                    </button>
                </footer>
            </div>
        </div>
    )
}

const useDeleteModal = ({title, message, saveAction}) => {
    const [open, setOpen] = useState(false);

    const modal = <Modal open={open} setOpen={setOpen} title={title} message={message} saveAction={saveAction} />

    return [setOpen, modal];
}

export default useDeleteModal;