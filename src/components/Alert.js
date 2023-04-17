import React from 'react'

const Alert = (props) => {
    setTimeout(() => {
        props.dismiss({status:false})
    }, 4000);
    return (
        <div>
            <div id="alert-component" className={`alert alert-${props.stat} fixed-top`} role="alert">
                {props.message}
            </div>
        </div>
    )
}

export default Alert
