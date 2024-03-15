import React, {useState, useEffect} from 'react';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import Split from 'react-split'
import { onSnapshot, addDoc, doc, deleteDoc, setDoc } from 'firebase/firestore';
import { notesCollection, db } from './firebase';
function App() {
  const [notes, setNotes]=useState([]);
  const [currentNoteId, setCurrentNoteId] = useState("")
  const [tempNoteText, setTempNoteText] = useState("")
  const currentNote = notes.find(note=>note.id === currentNoteId)||notes[0]
  const sortedNotes = notes.sort((a,b)=>b.updatedAt-a.updatedAt)

  useEffect(()=>{
        const unsubscribe = onSnapshot(notesCollection, function(snapshot){
          const notesArray = snapshot.docs.map(doc=>({
            ...doc.data(),
            id: doc.id
          }))
        setNotes(notesArray)
          } )   

        return unsubscribe; // clean up function
  },[])

  useEffect(()=>{
        if(!currentNoteId){
          setCurrentNoteId(notes[0]?.id)
        }
  },[notes])

  useEffect(()=>{
        if(currentNote){
          setTempNoteText(currentNote.body)
        }
  },[currentNote])

  useEffect(()=>{

        const id = setTimeout(()=>{
          if (tempNoteText && tempNoteText!=currentNote.body){
            updateNote(tempNoteText)
          }
        
        },500)

        return ()=>clearTimeout(id)
  },[tempNoteText])


  async function createNewNote(){
          const newNote ={
            body:"#Escribe tu nueva nota aquí",
            createdAt: Date.now(),
            updatedAt: Date.now()
            
          }
          const newNoteRef = await addDoc(notesCollection, newNote)
    
          setCurrentNoteId(newNoteRef.id)
  }

  function updateNote(text){
    
    const docRef =  doc(db,"notes", currentNoteId)
   
    setDoc(docRef, {body:text, updatedAt:Date.now()}, {merge:true})
  
  }

 async function deleteNote(noteId) {
      const docRef =  doc(db,"notes", noteId)
      await deleteDoc(docRef)
  }


  return (
   <main>
    {
      notes.length>0 ? 
      <Split sizes={[30,70]} direction='horizontal' className='split'>

        <Sidebar
        notes={notes}
        currentNote={currentNote}
        setCurrentNoteId={setCurrentNoteId}
        newNote={createNewNote}
        deleteNote={deleteNote} />
        <Editor 
        tempNoteText={tempNoteText}
        setTempNoteText={setTempNoteText}/>

      </Split>
      :
      <div className='no-notes'>
        <h1>No tienes notas guardadas</h1>
        <button onClick={createNewNote} className="first-note">Crea una ahora</button>
      </div>
    }
   </main>
  )
}

export default App;
