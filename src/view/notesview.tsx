
import { noteItem } from '../model/note.model'
import { DeleteTwoTone, UploadOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm } from 'antd';
import NotesStorageAPI from '../util/storage';

let currentId: string;
const confirm = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.success('Click on Yes');
    deleteItemById(currentId);
  };


function Notesview(itemObject: noteItem) {
  return (
    <>
        <div className="ds-flex notes flex-column flex-between">
            <div className='notes__header ds-flex flex-between'>
                <div className='notes__title'>
                    { itemObject.title }
                </div>
                <div className='notes__control'>
                    <UploadOutlined twoToneColor="#eb2f96" style={{ fontSize: '1.6em', marginRight: '0.2em'}} onClick={() => {}}/>
                    <Popconfirm
                        title="Delete the note"
                        description="Are you sure to delete this note?"
                        onConfirm={confirm}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteTwoTone twoToneColor="#eb2f96" style={{ fontSize: '1.6em'}} onClick={() => {currentId = itemObject.id}}/>
                    </Popconfirm>
                    
                </div>
            </div>
            <div className='notes__body flex-1'>
                { itemObject.content }
            </div>
            <div className='notes__bottom ds-flex flex-end'>
                <div className='notes__updatedtime'>
                    { convertTime(itemObject.updatedtime) }
                </div>
            </div>
        </div>
    </>
  )
}

function convertTime(timestr: string): string {
    const time = new Date(timestr).toJSON();
    return new Date(+new Date(time) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
}

function deleteItemById(id: string): void {
    //console.log('111')
    NotesStorageAPI.deleteItem(id)
}
export default Notesview
