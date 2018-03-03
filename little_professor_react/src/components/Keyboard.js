import React from 'react';
import Button from './Button';
import { baseKeyboard } from '../selectors/keyboard';

const PrintRow = (props) => (
    <div className="row_buttons">
    {
        props.optionKey.map((valKey, i) => 
            <Button 
                {...valKey}
                typeKeyboard={props.typeKeyboard}
                handleKey={props.handleKey}
                key={`${props.indice}_${i}`} 
            />
        )
    }
    </div>
);
//handleKey
const Keyboard = (props) => (
    <div className="keyboard_buttons">
        {
            baseKeyboard.map((optionKey, i) => 
                <PrintRow 
                    optionKey={optionKey} 
                    handleKey={props.handleKey}
                    typeKeyboard={props.typeKeyboard}
                    indice={i}
                    key={i}
                />
            )
        }
    </div>
);

export default Keyboard;