import React from 'react';

const Button = (props) => (
    <div className="wrapper_button">
        <div className="title_button">
            {
                props.typeKeyboard === "normal" ? (
                    props.value
                ) : (
                    props.config || props.value
                )
            }
        </div>
        <div 
            className="button" 
            onClick={() => 
                props.handleKey(
                    props.typeKeyboard === "normal" ? props.value : props.config || props.value
                    )
            }
        >
        </div>
    </div>
);

export default Button;