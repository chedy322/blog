import React from 'react';
import {Link} from 'react-router-dom'
import Delete from './Delete';
//to do adjut in center in 352 and 768px
function Publics({_id, title, summary, file, content, createdAt }) {
  return (
    <div>
      <Link to={`/${_id}`}>
        <div className="container">
          
            <img src={`http://localhost:3002/${file}`} alt="Post Image" />
          
        
          <div className='texts'>
            <h2>{title}</h2>
            <h5>{summary}</h5>
            
                {content.length > 150 ? (
        <div className="content">{stripHtmlTags(content).slice(0, 150)}......</div>
    ) : (
        <div className="content">{stripHtmlTags(content)}</div>
    )
}
            {/* <p className="summary">{summary}</p> */}
            <p className='info'>           
              <time><span>Created at </span>{createdAt}</time>   
            </p>
          </div>
        </div>
      </Link>
      {/* maybe add later the delete button depebds on the design */}
    </div>
    
  );
}

function stripHtmlTags(html) {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = html;
  return tempElement.textContent || tempElement.innerText || '';
}

export default Publics
