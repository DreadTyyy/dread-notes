import React from "react";
import PropTypes from "prop-types";
import { useState, useContext } from "react";
import LocaleContext from "../context/LocaleContext";
import ThemeContext from "../context/ThemeContext";

const CountWord = ({ titleWord }) => {
  let use = 50 + titleWord.length - 50;
  let sisaStyle = use >= 40 ? "self-end text-red-500" : "self-end";
  return <p className={sisaStyle}>{use}/50</p>;
};

const NoteInput = ({ onManipulate }) => {
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onBodyChangeHandler = (e) => {
    setBody(e.target.innerHTML);
  };

  const onTitleChangeHandler = (e) => {
    if (e.target.value.length <= 50) {
      setTitle(e.target.value);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    onManipulate({ title, body });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-xl pb-4">
        {locale === "id" ? "Buat catatan" : "Make Note"}
      </h2>
      <form
        onSubmit={onSubmitHandler}
        className={`flex flex-col justify-center md:w-2/4 w-full ${
          theme === "dark" ? "text-white" : "text-black"
        }`}>
        <CountWord titleWord={title} />
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={onTitleChangeHandler}
          className="mb-2 rounded-md p-1"
          placeholder={locale === "id" ? "Judul catatan" : "Title Note"}
          required
        />
        <p>{locale === "id" ? "Konten catatan" : "Note content"}:</p>
        <div
          className="mb-2 rounded-md p-1 max-h-72 h-72 bg-white overflow-auto"
          name="body"
          onInput={onBodyChangeHandler}
          id="body"
          contentEditable></div>
        <button
          type="submit"
          className="bg-black text-white border border-white rounded-md py-2">
          {locale === "id" ? "Buat" : "Send"}
        </button>
      </form>
    </div>
  );
};
CountWord.propTypes = {
  titleWord: PropTypes.string.isRequired,
};

NoteInput.propTypes = {
  onManipulate: PropTypes.func.isRequired,
};

export default NoteInput;
