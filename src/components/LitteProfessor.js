import React from 'react';
import Lcd from './Lcd';
import Keyboard from './Keyboard';
import { showOptionsLCD } from '../selectors/utils';
import calculator from '../modules/calculator';
import { createGame, validateGame } from '../modules/game';
const MAX_ATTEMPTS = 3;
let interval = 0;

export default class LitteProfessor extends React.Component {
    state = {
        lcd : "0", 
        equation : "",
        result : 0, 
        attempts : 0,
        responseGame : false, 
        typeKeyboard : "normal",
        mode : "calculator", 
        options : {
            level : 1, 
            operation : "MIX"
        }
    };

    startNewGame = () => {
        const newGame = createGame (
            this.state.options.level, 
            this.state.options.operation
        );
        this.setState(() => ({
            lcd : newGame.lcd, 
            equation : newGame.lcd, 
            result: newGame.result, 
            attempts : 0, 
            responseGame : false
        }));
    };

    handleKey = (value) => {
        //Presiona la tecla de invocar la configuración...
        if(this.state.typeKeyboard === "normal") {
            if(value === "SET") {
                clearInterval(interval);
                this.setState(() => ({
                    typeKeyboard : "config", 
                    equation : "",
                    lcd : showOptionsLCD(this.state.mode, this.state.options)
                }));
            } else {
                if(this.state.mode === "calculator") {
                    const { lcd, equation, result } = calculator(
                        this.state.lcd,
                        this.state.equation, 
                        this.state.result,
                        value
                    );
                    this.setState(() => ({ lcd, equation, result }));
                } else {
                    if(!this.state.responseGame) {
                        //Modo Juego...
                        const {
                            validValue, 
                            isCorrect, 
                            partiallyCorrect
                        } = validateGame(
                            this.state.result, 
                            this.state.lcd, 
                            value
                        );
                        if(validValue) {
                            if(isCorrect || partiallyCorrect) {
                                this.setState((prevState) => ({
                                    lcd : prevState.lcd + value
                                }));
                            } else {
                                this.setState((prevState) => ({
                                    lcd : "ERROR", 
                                    attempts : prevState.attempts + 1, 
                                    responseGame : true
                                }));
                            }
                            if(!partiallyCorrect || isCorrect) {
                                interval = setTimeout(() => {
                                    if(isCorrect) {
                                        this.startNewGame();
                                    } else {
                                        if(this.state.attempts < MAX_ATTEMPTS) {
                                            this.setState((prevState) => ({
                                                lcd : prevState.equation,
                                                responseGame : false
                                            }));
                                        } else {
                                            this.setState((prevState) => ({
                                                lcd : `${prevState.equation}${prevState.result}`
                                            }));
                                            setTimeout(() => {
                                                this.startNewGame();
                                            }, 1500);
                                        }
                                    }
                                }, 1000);
                            }
                        }
                    }
                }
            }
        } else {
            //Está mostrando el teclado de configuración...
            if(value === "Mode") {
                this.setState((prevState) => ({
                    mode : prevState.mode === "game" ? "calculator" : "game",
                    lcd : showOptionsLCD(prevState.mode === "game" ? "calculator" : "game", this.state.options)
                }));
            } else if(value === "GO") {
                //Si ha seleccionado modo de juego, se lanza el ejercicio...
                let lcd = "0";
                let equation = "";
                let result = 0;
                if(this.state.mode === "game") {
                    const newGame = createGame (
                        this.state.options.level, 
                        this.state.options.operation
                    );
                    equation = lcd = newGame.lcd;
                    result = newGame.result;
                }
                this.setState(() => ({
                    typeKeyboard : "normal", 
                    lcd, 
                    equation, 
                    result,
                    attempts : 0, 
                    responseGame : false
                }));
            } else if(this.state.mode === "game") {
                //Para establecer el nivel del juego...
                if((+value >= 1 && +value <= 5)) {
                    this.setState((prevState) => ({
                        options : {
                            level : +value, 
                            operation : this.state.options.operation
                        }, 
                        lcd : showOptionsLCD("game", {
                            level : +value, 
                            operation : this.state.options.operation
                        })
                    }));
                } else if(value === "MIX" || value === "+" || value === "-" || value === "%" || value === "X") {
                    //Los operadores...
                    this.setState(() => ({
                        options : {
                            level : this.state.options.level,
                            operation : value
                        }, 
                        lcd : showOptionsLCD("game", {
                            level : this.state.options.level,
                            operation : value
                        })
                    }));
                }
            }
        }
    };
    
    componentDidMount() {
        if(this.state.mode === "game") {
            this.startNewGame();
        }
    }

    render() {
        return (
            <div className="flex-container">
                <div className="container">
                    <div className="frame_game">
                        <Lcd 
                            value={this.state.lcd} 
                            textAlign={this.state.mode === "game" ? "left" : "right"}
                        />
                        <div className="keyboard">
                            <div className="face">
                                <div className="line dipstick__left"></div>
                                <div className="glasses glasses__left">
                                    <div className="iris">
                                        <div className="pupil"></div>
                                    </div>
                                </div>
                                <div className="nose">
                                    <div className="nostril nostril__left"></div>
                                    <div className="nostril nostril__right"></div>
                                </div>
                                <div className="line dipstick__right"></div>
                                <div className="glasses glasses__right">
                                    <div className="iris">
                                        <div className="pupil"></div>
                                    </div>
                                </div>
                                <div id="mustache">
                                    <div className="mustache"></div>
                                    <div className="mustache"></div>
                                </div>
                                <div className="front"></div>
                                <div className="cheek">
                                    <div className="mouth"></div>
                                </div>
                            </div>
                            <div className="book">
                                <div className="sheet_book"></div>
                                <div className="sheet_book_lines sheet_book_lines__left">
                                    <div className="line line_sheet_one"></div>
                                    <div className="line line_sheet_two"></div>
                                </div>
                                <div className="mount_book"></div>
                                <div className="sheet_book_lines sheet_book_lines__right">
                                    <div className="line line_sheet_one"></div>
                                    <div className="line line_sheet_two"></div>
                                </div>
                                <div className="line left_line"></div>
                                <div className="spine">
                                    <div className="oval_spine"></div>
                                </div>
                                <div className="line right_line"></div>
                                <div className="hand hand_left">
                                    <div className="finger finger__one"></div>
                                    <div className="finger finger__two"></div>
                                    <div className="finger finger__three"></div>
                                    <div className="finger finger__four"></div>
                                </div>
                                <div className="hand hand_right">
                                    <div className="finger finger__one"></div>
                                    <div className="finger finger__two"></div>
                                    <div className="finger finger__three"></div>
                                    <div className="finger finger__four"></div>
                                </div>
                                <Keyboard 
                                    handleKey={this.handleKey}
                                    mode={this.state.mode}
                                    typeKeyboard={this.state.typeKeyboard}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};