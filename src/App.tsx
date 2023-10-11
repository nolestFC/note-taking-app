import { useState } from 'react';
import './App.css';
import Noteslist from './view/noteslist';
import Editpanel from './view/editpanel';
import NotesStorageAPI from './util/storage';
import { currentInputs, noteItem, noteItemList } from './model/note.model';
function App() {
  //mock data
  NotesStorageAPI.init();
  // let emptyObject:currentInputs = {
  //   inputValue: '',
  //   textAreaValue: ''
  // }
  // let emptyList:noteItem[] = [];
  // const [currentEditObject, setcurrentEditObject] = useState<currentInputs>(emptyObject);
  // let [listArray, setlistArray] = useState<noteItem[]>(emptyList);
  // console.log(NotesStorageAPI.getAllNotes())
  //setlistArray(NotesStorageAPI.getAllNotes());
  return (
    <>
    <div className='ds-flex page'>
      <div className="ds-flex page__list">
          <Noteslist></Noteslist>
      </div>
      <div className='ds-flex page__edit flex-1 flex-center'>
        <Editpanel></Editpanel>
      </div>
    </div>
    </>
  )
}

export default App
