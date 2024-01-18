import React from "react";
import {
  getArchivedNotes,
  unarchiveNote,
  deleteNote,
} from "../utils/network-data";
import NoteList from "../components/NoteList";
import PropTypes from "prop-types";
import SearchList from "../components/SearchList";
import { useSearchParams } from "react-router-dom";

const ArchievedPageWrapper = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search");
  function changeSearchParams(search) {
    setSearchParams({ search });
  }

  return (
    <>
      <ArchievedPage
        defaultSearch={search}
        onChangeSearch={changeSearchParams}
      />
    </>
  );
};

class ArchievedPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      query: this.props.defaultSearch || "",
      loading: true,
    };

    this.onArsipHandler = this.onArsipHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onQueryChangesHandler = this.onQueryChangesHandler.bind(this);
  }

  async componentDidMount() {
    const { data } = await getArchivedNotes();
    this.setState(() => {
      return {
        notes: data,
        loading: false,
      };
    });
  }

  async onArsipHandler(id) {
    await unarchiveNote(id);
    const { data } = await getArchivedNotes();
    this.setState(() => {
      return {
        notes: data,
      };
    });
  }
  async onDeleteHandler(id) {
    await deleteNote(id);
    const { data } = await getArchivedNotes();
    this.setState(() => {
      return {
        notes: data,
      };
    });
  }
  onQueryChangesHandler(event) {
    this.props.onChangeSearch(event.target.value);
    this.setState(() => {
      return {
        query: event.target.value,
      };
    });
  }
  render() {
    return (
      <>
        <SearchList
          onQuery={this.onQueryChangesHandler}
          query={this.state.query}
        />
        {this.state.loading ? (
          <p>Loading...</p>
        ) : (
          <NoteList
            query={this.state.query}
            notes={this.state.notes}
            onArsip={this.onArsipHandler}
            onDelete={this.onDeleteHandler}
            isArchived={true}
          />
        )}
      </>
    );
  }
}

ArchievedPage.propTypes = {
  query: PropTypes.string,
  defaultSearch: PropTypes.string,
  onChangeSearch: PropTypes.func.isRequired,
};

export default ArchievedPageWrapper;
