import React, { useState, forwardRef, useImperativeHandle } from "react"

// Component to toggle visibility of its children
const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    // Styles for visibility toggling
    const hideWhenVisible = {display: visible ? 'none' : ''}
    const showWhenVisible = {display: visible ? '' : 'none'}

    // Toggle visibility function
    const toggleVisibility = () => {
        setVisible(!visible)
    }

    // Expose toggleVisibility method to parent
    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })

    // Render the component
    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
})

export default Togglable