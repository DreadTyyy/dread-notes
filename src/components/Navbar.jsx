import { useContext } from "react";
import { Link } from "react-router-dom";
import LocaleContext from "../context/LocaleContext";
import ThemeContext from "../context/ThemeContext";
import PropTypes from "prop-types";

const Navbar = ({ onLogout, authUser }) => {
  const { locale, toggleLocale } = useContext(LocaleContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="flex flex-wrap justify-between items-center py-4">
      <h1 className="font-bold text-2xl">
        {locale === "id" ? "Catatan Saya" : "My Notes"}
      </h1>
      <div className="flex items-center gap-4 md:gap-8">
        <button
          onClick={toggleLocale}
          className="hover:text-green-400 hover:underline ">
          {locale === "id" ? "EN" : "ID"}
        </button>
        {authUser !== null ? (
          <>
            <Link to="/" className="hover:text-green-400 hover:underline">
              {locale === "id" ? "Beranda" : "Home"}
            </Link>
            <Link
              to="/notes/new"
              className="hover:text-green-400 hover:underline">
              {locale === "id" ? "Tambah" : "Add"}
            </Link>
            <Link
              to="/archieved"
              className="hover:text-green-400 hover:underline">
              {locale === "id" ? "Arsip" : "Archieved"}
            </Link>
            <button
              onClick={onLogout}
              className="hover:text-green-400 hover:underline">
              {locale === "id" ? "Keluar" : "Logout"}
            </button>
          </>
        ) : (
          ""
        )}
        <button onClick={toggleTheme} className="bg-white rounded-full p-2">
          {theme === "dark" ? (
            <img src="/src/assets/moon-fill.svg" alt="" />
          ) : (
            <img src="src/assets/brightness-low.svg" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;

Navbar.propTypes = {
  onLogout: PropTypes.func.isRequired,
  authUser: PropTypes.object,
};
