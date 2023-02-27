import "./Header.css"
import banner from './drag-and-drop.png'; 

function Header(){
    const title = "KANBAN BOARD"
    const description = "click and hold to drag, move and release to drop" 
    return(
        <header className="header">                                                
            <h1 className="title">{title}</h1>
            <img className="banner" src={banner} alt="kanban image" />          
            <p className="description">{description}</p>
        </header>                            
    )
}

export default Header