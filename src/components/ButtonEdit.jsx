import PropTypes from "prop-types";
import { useContext } from "react";
import LocaleContext from "../context/LocaleContext";

const ButtonEdit = ({ children, onArsip, onDelete, id }) => {
  const { locale } = useContext(LocaleContext);
  return (
    <>
      <button
        onClick={() => onDelete(id)}
        className="text-center font-bold w-full border-r border-white py-1 text-red-700 hover:bg-red-700 hover:text-white transition-all">
        {locale === "id" ? "Hapus" : "Delete"}
      </button>
      <button
        onClick={() => onArsip(id)}
        className="text-center font-bold w-full py-1 text-yellow-600 hover:bg-yellow-600 hover:text-white transition-all">
        {children}
      </button>
    </>
  );
};

ButtonEdit.propTypes = {
  onArsip: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default ButtonEdit;
