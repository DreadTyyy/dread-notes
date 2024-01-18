import PropTypes from "prop-types";
import { useContext } from "react";
import LocaleContext from "../context/LocaleContext";
import ThemeContext from "../context/ThemeContext";

const SearchList = ({ query, onQuery }) => {
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);
  const style = "my-4 w-[80%] bg-transparent border rounded-md p-1";
  const wMode = theme === "dark" ? "border-white" : "border-black";

  return (
    <input
      value={query}
      onChange={onQuery}
      className={`${style} ${wMode}`}
      name="search"
      id="search"
      type="text"
      placeholder={locale === "id" ? "Cari disini..." : "Search here..."}
    />
  );
};

SearchList.propTypes = {
  query: PropTypes.string.isRequired,
  onQuery: PropTypes.func.isRequired,
};

export default SearchList;
