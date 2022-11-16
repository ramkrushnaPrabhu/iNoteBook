import React, { useContext } from 'react'
import noteContext from '../context/notes/notesContext';

const Alert = () => {

    const context = useContext(noteContext);
    const { alert } = context;
    return (
        <div style={{height: '50px'}}>
        {alert && <div class={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
            <strong>{alert.type}: </strong>{alert.msg}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>}
        </div>
    )
}

export default Alert