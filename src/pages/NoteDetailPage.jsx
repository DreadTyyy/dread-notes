import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  archiveNote,
  deleteNote,
  getNote,
  unarchiveNote,
} from "../utils/network-data";
import ButtonEdit from "../components/ButtonEdit";
import parse from "react-html-parser";
import { useEffect, useState, useContext } from "react";
import LocaleContext from "../context/LocaleContext";

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [foundNote, setFoundNote] = useState([]);
  const [loading, setLoading] = useState(true);
  const { locale } = useContext(LocaleContext);

  useEffect(() => {
    const fetchNote = async () => {
      const { data } = await getNote(id);
      setFoundNote(data);
      setLoading(false);
    };
    fetchNote();
  }, [id]);

  const archieveNoteHandler = async (id) => {
    if (foundNote.archived === true) {
      await unarchiveNote(id);
    } else {
      await archiveNote(id);
    }
    const { data } = await getNote(id);
    setFoundNote(data);
  };

  const deleteNoteHandler = async (id) => {
    await deleteNote(id);
    navigate("/");
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col justify-between min-h-[70vh] h-[70vh]">
          <div>
            <h1 className="mt-8 text-4xl font-bold">{foundNote.title}</h1>
            <h5 className="mb-4 text-gray-300">
              {new Date(foundNote.createdAt).toLocaleString()}
            </h5>
            <p>{parse(foundNote.body)}</p>
          </div>
          <div className="flex justify-end flex-nowrap">
            <div className="w-[100%]">
              <ButtonEdit
                onArsip={archieveNoteHandler}
                onDelete={deleteNoteHandler}
                id={foundNote.id}>
                {locale === "id"
                  ? !foundNote.archived
                    ? "Arsipkan"
                    : "Buka Arsip"
                  : !foundNote.archived
                  ? "Archieve"
                  : "Unarchieve"}
              </ButtonEdit>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default NoteDetailPage;
