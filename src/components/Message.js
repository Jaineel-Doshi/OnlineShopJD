import React from 'react'
import { Alert } from 'react-bootstrap'

function Message({ variant, children }) {
    return (
        <small><Alert variant={variant}>
            {children}
        </Alert></small>
    )
}

export default Message