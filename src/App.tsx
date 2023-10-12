import './App.css';
import Noteslist from './view/noteslist';
import Editpanel from './view/editpanel';
import NotesStorageAPI from './util/storage';
function App() {
  //mock data
  NotesStorageAPI.init();
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
