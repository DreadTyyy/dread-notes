import NoteItem from "./NoteItem";
import ButtonEdit from "./ButtonEdit";
import PropTypes from "prop-types";
import { useContext } from "react";
import LocaleContext from "../context/LocaleContext";

function ZeroNote() {
  const { locale } = useContext(LocaleContext);
  if (locale === "id") {
    return <p>Catatan tidak tersedia.</p>;
  } else {
    return <p>Notes not available</p>;
  }
}

const NoteList = ({ notes, onArsip, onDelete, query, isArchived }) => {
  const { locale } = useContext(LocaleContext);
  const searchCatatan = notes.filter((note) => {
    let lowerTitle = note.title.toLowerCase();
    return lowerTitle.match(query.toLowerCase());
  });

  return (
    <>
      <h2 className="text-xl pb-4">
        {locale === "id"
          ? !isArchived
            ? "Daftar Catatan"
            : "Arsip Catatan"
          : !isArchived
          ? "Notes List"
          : "Archieved Notes"}
      </h2>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 pb-10">
        {!searchCatatan.length ? (
          <ZeroNote />
        ) : (
          searchCatatan.map((note) => (
            <NoteItem key={note.id} {...note}>
              <ButtonEdit onArsip={onArsip} onDelete={onDelete} id={note.id}>
                {locale === "id"
                  ? !isArchived
                    ? "Arsipkan"
                    : "Buka Arsip"
                  : !isArchived
                  ? "Archieve"
                  : "Unarchieve"}
              </ButtonEdit>
            </NoteItem>
          ))
        )}
      </div>
    </>
  );
};

NoteList.propTypes = {
  notes: PropTypes.array.isRequired,
  onArsip: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  query: PropTypes.string,
  isArchived: PropTypes.bool.isRequired,
};

export default NoteList;
