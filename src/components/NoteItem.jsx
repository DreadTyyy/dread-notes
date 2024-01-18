import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import parse from "react-html-parser";

const NoteItem = ({ id, title, body, createdAt, children }) => {
  return (
    <div className="group bg-slate-800 rounded-md overflow-hidden h-fit text-white">
      <div className="p-4 border-b border-white max-h-[13.2rem] overflow-hidden">
        <h4 className="text-lg font-semibold group-hover:text-green-500 hover:underline transition-all">
          <Link to={`/notes/${id}`}>{title}</Link>
        </h4>
        <p className="text-slate-500 text-sm">
          {new Date(createdAt).toLocaleString()}
        </p>
        <div>{parse(body)}</div>
      </div>
      <div className="flex justify-center items-center">{children}</div>
    </div>
  );
};

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};

export default NoteItem;
