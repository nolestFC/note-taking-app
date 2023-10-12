import { useState, createContext } from 'react';
import { Button, ConfigProvider, Input, Modal, theme, Upload, message } from 'antd';
import NotesStorageAPI from '../util/storage';
import { noteItem, currentInputs } from '../model/note.model';
import CsvDownloadButton from 'react-json-to-csv';
import csvToJson from 'convert-csv-to-json';
import type { UploadProps } from 'antd';

const { TextArea } = Input;
let inputValue: string;
let textareaValue: string;
let currentEditObject: noteItem;
let csvData = [
  ["firstname", "lastname", "email"],
  ["Ahmed", "Tomi", "ah@smthing.co.com"],
  ["Raed", "Labes", "rl@smthing.co.com"],
  ["Yezzi", "Min l3b", "ymin@cocococo.com"]
];

const props: UploadProps = {
  name: 'file',
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      //message.success(`${info.file.name} file uploaded successfully`);
      console.log(info)
      // let json = csvToJson.getJsonFromCsv(info.file.name);
      // console.log(json)
      // for(let i=0; i<json.length;i++){
      //     console.log(json[i]);
      // }
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const ReachableContext = createContext<string | null>(null);

const config = {
    title: 'Title Can not be empty',
    content: (
      <>
        <ReachableContext.Consumer>{() => `Please enter title!`}</ReachableContext.Consumer>
        <br />
      </>
    ),
  };
const LocalizedModal = () => {
    const [open, setOpen] = useState(false);
    const [csvData, setcsvData] = useState<noteItem[]>();
    const [lv2modal, contextHolder] = Modal.useModal();
    const showModal = () => {
      setOpen(true);
    };
  
    const resetData = () => {
      NotesStorageAPI.resetData();
    }
    const hideModal = () => {
      setOpen(false);
    }
    const importCSV = () => {
      
    }
    const exportCSV = () => {
      let array:noteItem[] = NotesStorageAPI.getAllNotes();
      setcsvData(array);
    }
    const doSave = () => {
        if(!inputValue){
            lv2modal.error(config);
        }
        else{
            if(!currentEditObject) {
                // it's new
                let submitObject: noteItem = NotesStorageAPI.requestNewItem();
                submitObject.title = inputValue;
                submitObject.content = textareaValue;
                NotesStorageAPI.setItem(submitObject);
                setOpen(false);
            }
            else{
                // it's editing old
                currentEditObject.title = inputValue;
                currentEditObject.content = textareaValue;
                NotesStorageAPI.setItem(currentEditObject);
                setOpen(false);
            }
        }
    };

    return (
      <>
        <ReachableContext.Provider value="Light">
            <Button type="primary" block onClick={showModal}>Save Note</Button>
            <Button type="link" onClick={resetData}> Reset Data </Button>
            <Upload {...props}>
              <Button style={{ marginTop: '3em', marginBottom: "2em"}}>Import Notes from CSV(not working)</Button>
            </Upload>
            <CsvDownloadButton data={csvData} onMouseOver={exportCSV}>Export Notes to CSV(working)</CsvDownloadButton>
            <Modal
            title="Confirm Save This Note?"
            open={open}
            onOk={doSave}
            onCancel={hideModal}
            okText="Sure"
            cancelText="Cancel"
            width="50%"
            >
            <p>Bla bla ...</p>
            </Modal>
            {contextHolder}
        </ReachableContext.Provider>
        
      </>
    );
  };

function Editpanel() {
  const [count, setCount] = useState(0);
  const [modal, contextHolder] = Modal.useModal();

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    switch(e.currentTarget.nodeName)
    {
        case 'INPUT': inputValue = e.currentTarget.value; break;
        case 'TEXTAREA': textareaValue = e.currentTarget.value; break;
    }
  };

  return (
    <>
        <div className='editpanel ds-flex flex-column align-center flex-center'>
            <ConfigProvider
                theme={{
                    algorithm: theme.darkAlgorithm,
                }}
            >
                <Input className='editpanel__title' placeholder="*input title" allowClear onChange={onChange} />
                <TextArea className='editpanel__textarea' placeholder="input content" allowClear style={{ width: 400, height: 400, resize: 'none' }} onChange={onChange} />
            </ConfigProvider>
            <LocalizedModal />
            
        </div>
    </>
  )
}

export default Editpanel
