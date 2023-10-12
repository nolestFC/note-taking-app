import Notesview from './notesview'
import NotesStorageAPI from '../util/storage';
function Noteslist() {
    let listArray = NotesStorageAPI.getAllNotes();
    let listItems = listArray.map(item => <Notesview key={item.id} {...item}/>);
    return (
    <>
        <div className='noteslist ds-flex flex-column flex-1'>
            { listItems }
        </div>
    </>
    )
}

export default Noteslist
