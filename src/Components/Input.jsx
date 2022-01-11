import React, { Component } from 'react';

import dwnarrow from 'D:/Work/reactjs/todolist/src/IMG/down-arrow.png'
import './Input.css'

class Input extends Component {
    render() {
        const {doneAll, onKeyDown} = this.props

        return (
            <div>
                <div className="wntbd">
                        <img 
                        className="arrow"
                        src={dwnarrow} width={32} height={32}
                        onClick={doneAll}/>
                        <input 
                        type="text" id="input" name="inputTodo"
                        placeholder="What needs to be done ?"
                        onKeyPress={onKeyDown}>
                        </input>
                    </div>
            </div>
        );
    }
}

export default Input;