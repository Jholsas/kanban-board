import Header from  './components/Header'
import Footer from  './components/Footer'
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid'
import './App.css';


const startingItemsBackLog = [    
  { id: uuidv4(), content: 'Do Onboard with an excellent teammate.' },
  { id: uuidv4(), content: 'Make the first pull request.' },
  { id: uuidv4(), content: 'Submit the first project to deploy.' },  
  
]

const startingItemsToDo = [      
  { id: uuidv4(), content: 'Stay active in the front-end community and keep studying the new technologies in the market.' },
  { id: uuidv4(), content: 'Understanding their business goals and desired outcomes, you can then recommend the most appropriate technologies, tools, and team shape for the project.'},
]

const startingItemsInProgress = [
  { id: uuidv4(), content: 'Wait to be chosen for the next step of this selection process and remain very excited to be part of the team.' },
]

const startingItemsTesting = [
  
]

const startingItemsDone = [  
  { id: uuidv4(), content: 'Learn how to use drag and drop functionality using React.' },
  { id: uuidv4(), content: 'Create a Kanban board with drag-and-drop functionality using React. The board should be able to display cards representing tasks that can be moved between columns using drag-and-drop. ' },  
  { id: uuidv4(), content: 'The completed project should be hosted on GitHub Pages and the link shared with Tahir Ghauri | Project Manager | Stellar Culinary Personnel.' },    
]


const startingColumns =
  {
    [uuidv4()]: { name: 'Backlog', items: startingItemsBackLog, description:'Place here all requests for this project.'},
    [uuidv4()]: { name: 'To Do', items: startingItemsToDo , description:'Place here only requests for this sprint.'},
    [uuidv4()]: { name: 'In Progress', items: startingItemsInProgress , description:'Place here requests that have already started.'},
    [uuidv4()]: { name: 'Testing', items: startingItemsTesting , description:'Place here requests that are in test status.'},
    [uuidv4()]: { name: 'Done', items: startingItemsDone, description:'Place here requests tested and ready to deploy.'},
  };


const onDragEnd = (result, columns, setColumns)=>{
  
  if(!result.destination) return;

  const { source, destination} = result;

  if(source.droppableId !== destination.droppableId){
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId]
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]:{
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]:{
        ...destColumn,
        items:destItems
      }
    })
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]:{
        ...column,
        items: copiedItems
      }
    })
  }
}

function App() {

  const [columns, setColumns] = useState(startingColumns);
    
  return (            
    <div>
      <Header/>    
      <div className='board'>              
        <DragDropContext 
          onDragEnd={result => onDragEnd(result, columns, setColumns)}
        >
        {Object.entries(columns).map(([id, column]) => {
            return (                        
              <div className='column' >                
                <div className='column-head' >
                  <h2 className='column-title'>{column.name}</h2>                                    
                  <p className='column-description'>{column.description}</p>                                    
                </div>    

                <div>                  
                <Droppable 
                  droppableId={id} 
                  key={id}>                  
                  {(provided, snapshot) => {
                    return (
                      <div className='column-body'                    
                        {...provided.droppableProps} 
                        ref={provided.innerRef}
                        style={{background: snapshot.isDraggingOver ? '#CCCCCC' : '#EEEEEE'}}
                      >
                        {column.items.map((item, index)=>{
                          return(                                                    
                            <Draggable 
                              key={item.id} 
                              draggableId={item.id} 
                              index={index}
                            >                          
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    className='card'
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: 'none',
                                      backgroundColor: snapshot.isDragging ? '#B5CDE1' : '#FAFAFA',                                    
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                  {item.content} 
    
                                  </div>
                                )
                              }}
                            </Draggable>
                          )
                        })}
                        {provided.placeholder}
                      </div>
                    )
                  }}
                </Droppable>
                </div>
              </div>
            )
          })}
        </DragDropContext>
      </div>
      <Footer/>    
    </div>
  );
}

export default App;
