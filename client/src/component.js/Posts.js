import React from 'react';
import {Link} from 'react-router-dom'
import Delete from './Delete';

function Posts({_id, title, summary, file, content, createdAt }) {
  return (
    <div>
      
      <Link to={`/edit/${_id}`}>
        {/* <h1>{_id}</h1> */}
        <div className="container">
        
        {/* `http://localhost:3002/${file}` */}
        <img src={`http://localhost:3002/${file}`} alt="Post Image" />
        
          <div className='texts'>
            <h2>{title}</h2>
            <p className='info'>
            {/* {
                content.length>30?(<div className="content">{content.slice(0,30)}......</div>):(<div className="content">{content}</div>)

              } */}
                  {content.length > 150 ? (
        <div className="content">{stripHtmlTags(content).slice(0, 150)}......</div>
    ) : (
        <div className="content">{stripHtmlTags(content)}</div>
    )
}
            
            </p>
              <time>{createdAt}</time>

            {/* <p className="summary">{summary}</p> */}
            <h5>{summary}</h5>
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




export default Posts
