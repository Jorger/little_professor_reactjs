import React from 'react';

const Lcd = (props) => (
    <div className="lcd">
        <div className="lcd--frame">
            <div id="lcd--numbers" style={{textAlign : props.textAlign}}>{props.value}</div>
        </div>
    </div>
);

export default Lcd;