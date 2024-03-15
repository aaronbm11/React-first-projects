import React, {useState} from "react"

export default function Sidebar(props){
let title =""
const noteElements = props.notes.map((note, index)=> {
    title = note.body.split("\n")
   return(<div key={note.id}>
        
        <div
        className={`title ${note.id===props.currentNote.id ? "selected-note" : ""}`}
        onClick={()=>props.setCurrentNoteId(note.id)}
        >
            
            <h4 className="text-snippet">{title[0]}</h4> 
            <button className="delete-btn" onClick={()=>props.deleteNote(note.id)}>
            
            <i className="gg-trash trash-icon"></i>
            </button>
        </div>
    </div>)
}
)

return(
    <section className="pane sidebar">
        <div className="sidebar--header">
            <h3>Notes</h3>
            <button className="new-note" onClick={props.newNote}>+</button>
        </div>
        {noteElements}
    </section>
)

}