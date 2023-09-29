import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import {useNavigate} from 'react-router-dom';

export default function Notes(props) {
  // History or Navigate
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }else{
      navigate("/login");
    }
  }, []);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  //REF
  const ref = useRef(null);
  const refClose = useRef(null);

  //Update note
  const updateNote = (currentNote) => {
    ref.current.click(); //Open pop up to edit note
    console.log("1");
    console.log(currentNote);
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };
  //Handle on click update submit note
  const handleClick = (e) => {
    let ctag = note.etag===""||note.etag==""?"General":note.etag
    e.preventDefault();
    console.log("2");
    editNote(note.id, note.etitle, note.edescription, ctag);
    props.showAlert("Note Updated successfully","success");
    setNote({etitle:"",edescription:"",etag:""})
    refClose.current.click();
  };

  // On text fields change
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    name="etitle"
                    value={note.etitle}
                    minLength={3}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    name="edescription"
                    value={note.edescription}
                    minLength={3}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    name="etag"
                    value={note.etag}
                    minLength={3}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                disabled={note.etitle.length<3||note.edescription.length<3}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <AddNote showAlert={props.showAlert} />
      <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="container mx-2">
        {notes.length===0 && 'no notes to display'}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert}/>
          );
        })}
      </div>
    </>
  );
}
