import { Link } from "react-router-dom";
import  {formatISO9075} from "date-fns";
export default function Post({_id,title,summary,img,createdAt,author}){
    return (
        <div className="post">
        <div className="image">
         <Link to={`/post/${_id}`}> 
          <img src={'https://blog-backend-u9sp.onrender.com/'+img} alt=""/>
          </Link>
         </div>
        
        <div className="texts">
        <Link to={`/post/${_id}`}> 
          <h2>{title}</h2>
          </Link>
          <p className="info">
            <Link className="author">{author.username}</Link>
            <time>{formatISO9075(new Date(createdAt))}</time>
          </p>
          <p className="summary">{summary}</p>
        </div>
      </div>

    )
}