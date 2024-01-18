import React from "react";
import NoteInput from "../components/NoteInput";
import { addNote } from "../utils/network-data";
import { useNavigate } from "react-router-dom";

const AddNotePage = () => {
  const navigate = useNavigate();

  async function onAddNoteHandler(form) {
    await addNote(form);
    navigate("/");
  }
  return (
    <>
      <NoteInput onManipulate={onAddNoteHandler} />
    </>
  );
};

export default AddNotePage;
