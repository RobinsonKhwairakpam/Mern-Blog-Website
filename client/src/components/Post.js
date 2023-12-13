import {formatISO9075} from "date-fns";
import {Link} from "react-router-dom";

export default function Post({
    _id,
    title,
    summary,
    cover,
    content,
    createdAt,
    author
})
{
  return (
    <div className="mb-10 grid grid-cols-2 gap-8">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img 
              src={'http://localhost:8000/'+cover} 
              alt=""
              className="overflow-hidden w-full h-64 object-center object-cover rounded-md"
          />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2 className="text-gray-800 font-bold text-2xl tracking-wide">{title}</h2>
        </Link>
        <p>
          <div className="font-semibold text-neutral-600 text-[15px] mt-2">
            by @{author?.username}
          </div>          
        </p>
        <time className="text-neutral-500 text-[12px]">
          {formatISO9075(new Date(createdAt))}
        </time>
        <p className="mt-4 font-semibold text-neutral-800">{summary}</p>
      </div>
    </div>
  );
}