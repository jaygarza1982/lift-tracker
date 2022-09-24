import React from 'react';
import { useState } from 'react';

const Modal = ({title, open, setOpen, bodyComponent, footerComponent}) => {

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
                    {bodyComponent}
                </section>
                <footer className="modal-card-foot">
                    {footerComponent}
                </footer>
            </div>
        </div>
    )
}

const useDeleteModal = ({title, bodyComponent, footerComponent}) => {
    const [open, setOpen] = useState(false);

    const modal = (
        <Modal
            open={open}
            setOpen={setOpen}
            title={title}
            bodyComponent={bodyComponent}
            footerComponent={footerComponent}
        />
    )

    return [setOpen, modal];
}

export default useDeleteModal;