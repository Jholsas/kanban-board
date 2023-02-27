import "./Footer.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import { ExternalLink } from 'react-external-link';

import {faLinkedin, faGithub} from "@fortawesome/free-brands-svg-icons"
import {faImagePortrait } from "@fortawesome/free-solid-svg-icons"

function Footer(){
    const creator = "by Joao Dos Santos Silva"
    const linkedIn = "https://www.linkedin.com/in/joao-dos-santos-silva/"
    const gitHub = "https://github.com/Jholsas"
    const portfolio = "https://portfolio-joao-five.vercel.app/"

    return(
        <footer className="footer">                         
            <h3>{creator}</h3>
            <ExternalLink className="icons" href={portfolio}>
                <FontAwesomeIcon icon={faImagePortrait} size="2x" color="#F5F5F5"/> 
            </ExternalLink>            
            <ExternalLink className="icons" href={linkedIn}>            
                <FontAwesomeIcon icon={faLinkedin} size="2x" color="#F5F5F5" />
            </ExternalLink>            
            <ExternalLink className="icons" href={gitHub}>            
                <FontAwesomeIcon icon={faGithub} size="2x" color="#F5F5F5"/>
            </ExternalLink>

                 
        </footer>
    )
}

export default Footer