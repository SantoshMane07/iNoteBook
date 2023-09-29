import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

export default function Addnote(props) {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  //Handle on click submit note
  const handleClick = (e) => {
    let ctag = note.tag===""||note.tag==""?"General":note.tag
    e.preventDefault();
    addNote(note.title, note.description, ctag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Note added successfully","success");
  };
  // On change
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h1>Add a Note</h1>
      <div className="my-3">
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              aria-describedby="emailHelp"
              onChange={onChange}
              name="title"
              minLength={3}
              required
              value={note.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              aria-describedby="emailHelp"
              onChange={onChange}
              name="description"
              minLength={3}
              required
              value={note.description}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              aria-describedby="emailHelp"
              onChange={onChange}
              name="tag"
              minLength={3}
              required
              value={note.tag}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={note.title.length < 3 || note.description.length < 3}
            onClick={handleClick}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
}
