import { Link } from "react-router-dom";

export interface ButtonProps {
  text: string;
  path?: string;
  onClick?: () => void;
}

export function Button({text, path, onClick}: ButtonProps) {
  return path ?
      <Link className="mx-2 h-7 hover:h-[1.55rem] rounded duration-100 ease-in border-b-gray-600 hover:border-b-blue-700 border-b-4" to={path}>{text}</Link>
    :
      <button className="mx-2 h-7 hover:h-6 rounded duration-100 ease-in border-b-gray-600 hover:border-b-purple-700 border-b-4" onClick={onClick}>{text}</button>
}