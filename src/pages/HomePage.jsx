import React from "react";
import NoteList from "../components/NoteList";
import SearchList from "../components/SearchList";
import { deleteNote, archiveNote, getActiveNotes } from "../utils/network-data";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState(() => {
    return searchParams.get("search") || "";
  });

  useEffect(() => {
    const fetchNotes = async () => {
      const { data } = await getActiveNotes();
      setNotes(data);
      setLoading(false);
    };
    fetchNotes();
  }, []);

  const onQueryChangesHandler = (e) => {
    setKeyword(e.target.value);
    setSearchParams({ search: e.target.value });
  };

  const onArsipHandler = async (id) => {
    await archiveNote(id);
    const { data } = await getActiveNotes();
    setNotes(data);
  };

  const onDeleteHandler = async (id) => {
    await deleteNote(id);
    const { data } = await getActiveNotes();
    setNotes(data);
  };

  return (
    <>
      <SearchList onQuery={onQueryChangesHandler} query={keyword} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <NoteList
          query={keyword}
          notes={notes}
          onArsip={onArsipHandler}
          onDelete={onDeleteHandler}
          isArchived={false}
        />
      )}
    </>
  );
};

export default HomePage;
