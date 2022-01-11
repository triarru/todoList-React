import React, { Component } from 'react';

import './FilterButton.css'

class FilterButton extends Component {
    render() {
        const {list , activeItems, allItems, completedItems,clearCompleted,filterType} = this.props
        if(list.length>0){
            return(
                <div className='footer container'>
                    <div className='floatleft'>{list.length} items left</div>
                    <div className='centerbtn'>
                        <button className={filterType == 'all' ? 'btn allbtn' : 'btn'} onClick={allItems}>All</button>
                        <button className={filterType == 'active' ? 'btn activebtn' : 'btn'} onClick={activeItems}>Active</button>
                        <button className={filterType == 'complete' ? 'btn completebtn' : 'btn'} onClick={completedItems}>Completed</button>
                    </div>
                    <button className={'btn Clear'} onClick={clearCompleted}>Clear Complete</button>
                </div>
            )
        }
        return(
            <div/>
        )
    }
}

export default FilterButton;