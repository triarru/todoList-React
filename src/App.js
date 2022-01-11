/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import './App.css';

//components
import FilterButton from './Components/FilterButton'
import Input from './Components/Input'

//css
import './App.css'

//image
import close from './IMG/close.png'
import done from './IMG/done.png'
import undone from './IMG/undone.png'


class App extends Component{
  constructor(props){
    super(props)
    this.doneAll = this.doneAll.bind(this)
    this.state = {
        list :[],
        completedItems :[],
        activeItems :[],
        filterType: '',
        inputIndex : 0
    }
  }

  toggleInput(e){  //Nhấn 2 lần để edit lại item
    return(event) =>{
      const { list } = this.state
      const index = list.indexOf(e)
      const isEditing = e.isEditing
      this.setState({
        inputIndex : index,
        list:[
          ...list.slice(0,index),
            {
            ...e, isEditing: !isEditing
            },
          ...list.slice(index+1)
        ],
      })   
    }
  }

  toggleItem = (e) =>{ //Sau khi nhập xong nhấn Enter để lưu item mới
    const {list,inputIndex} = this.state
    if (e.key === 'Enter'){
      this.setState({
        list:[
          ...list.slice(0,inputIndex),
            {
            item: e.target.value, isEditing: false, isComplete: false
            },
          ...list.slice(inputIndex+1)
        ]
      })
     }
  }

  allItems = () =>{ //
      this.setState({
          filterType : 'all'
      })
  }

  completedItems = () =>{
      const {list} = this.state
      this.setState({
          completedItems : list.filter(e => e.isComplete),
          filterType: 'complete'
      })
  }

  activeItems = () =>{
      const {list} = this.state
      this.setState({
          activeItems : list.filter(e => !e.isComplete),
          filterType: 'active'
      })
  }

  clearCompleted = () =>{
    const {list,completedItems} = this.state
    this.setState({
      list : list.filter(e => !e.isComplete),
      completedItems : completedItems.filter(e => !e.isComplete)
    })
  }

  onClicked(e){
      return(event) =>{
        const isComplete = e.isComplete
        const {list,activeItems,completedItems,filterType} = this.state
        const index = list.indexOf(e)
        const index2 = activeItems.indexOf(e)
        const index3 = completedItems.indexOf(e)
          this.setState({
            list:[
              ...list.slice(0,index),
                {
                ...e, isComplete: !isComplete
                },
              ...list.slice(index+1)
            ],
          })
        if(filterType === 'active'){
          activeItems.splice(index2,1)
            this.setState({
              activeItems: activeItems
            })
        }
        if(filterType === 'complete'){
          completedItems.splice(index3,1)
            this.setState({
              completedItems: completedItems
            })
        }
      }
  }

  doneAll = () =>{
      const {list} = this.state
      if(list.every(e => e.isComplete === true)){
        this.setState({
          list: list.map(e => {
            return{
              ...e, 
              isComplete:false
            }
          })
        })
      }else{
        this.setState({
            list: list.map(e=>{
                return{
                    ...e,
                    isComplete: true
                }
            })
        })
      }
  }

  deleteItem(e){
      return(event) =>{
          const {list, completedItems, activeItems, filterType} = this.state
          const index = list.indexOf(e)
          const index2 = activeItems.indexOf(e)
          const index3 = completedItems.indexOf(e)
          list.splice(index,1)
          this.setState({
              list: list
          })
          localStorage.setItem('name', JSON.stringify(list))
          if(filterType === 'active'){
              activeItems.splice(index2,1)
              this.setState({
                  activeItems: activeItems
              })
          }
          if(filterType === 'complete'){
              completedItems.splice(index3,1)
              this.setState({
                  completedItems: completedItems
              })
          }
      }
  } 

  onKeyDown = (event) =>{
    const { list } = this.state
      if (event.key === 'Enter' && event.target.value.trim()!==''){
          
          let val = event.target.value
          let list2 = [...list,{item : val , isComplete: false, isEditing :false }]
          this.setState({ 
              list : list2,
              activeItems :list2
          })
          localStorage.setItem('name', JSON.stringify(list2))
          event.target.value = ''
      }
  }

  componentDidMount() {
    let name = []
    if(localStorage.hasOwnProperty('name')){
      name = JSON.parse(localStorage.getItem('name'))
    }  
    this.setState({ list : name });
  }
  
  componentDidUpdate() {
    const list2 = this.state.list
    localStorage.setItem('name', JSON.stringify(list2))
  }

  render(){
    const {list,completedItems,activeItems,filterType} = this.state
    var arr = list

    switch(filterType){
        case 'complete':
            arr = list 
            arr = [...completedItems]
            break;
        case 'active':
            arr = list
            arr = [...activeItems]
            break;
        default:
            arr = list
    }

    return(
      <div className="App container">
        <div className="todos container">
              <h1 className="todosText">todos</h1>
        </div>
        <Input
         doneAll={this.doneAll} 
         onKeyDown={this.onKeyDown}
        />
          <div>
            {arr.map((e,index)=>
                <div key={index} className={e.isComplete ? 'Input-checked' : 'Input-unchecked'}>
                  <img src={e.isComplete ? done : undone} width={32} height={32}
                  onClick={this.onClicked(e)}
                  ></img>
                  {!e.isEditing ? 
                  <div className={e.isComplete ? 'linethrough itemList' : 'noLinethrough itemList'} onDoubleClick={this.toggleInput(e)}>{e.item} </div> 
                  : <input className='editInputList' type="text"
                      onDoubleClick={this.toggleInput(e)}
                      onKeyPress={this.toggleItem} 
                      autoFocus></input>}                 
                  <img className="close" src={close} height={12} width={12}
                  onClick={this.deleteItem(e)}/>
                </div>)}
          </div>
        <FilterButton 
         list={list}
         filterType={filterType}
         activeItems={this.activeItems}
         allItems={this.allItems}
         completedItems={this.completedItems}
         clearCompleted={this.clearCompleted}/>
      </div>
    )
  }
//<input type="text" value={e.arr} onKeyDown={this.toggleItem} />
}
export default App;
