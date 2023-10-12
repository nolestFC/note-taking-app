import { useState, createContext } from 'react';
import { Button, ConfigProvider, Input, Modal, theme, Upload, message } from 'antd';
import NotesStorageAPI from '../util/storage';
import { noteItem } from '../model/note.model';
import CsvDownloadButton from 'react-json-to-csv';
import { CSVToJSON } from '../util/util';

import { useRef } from 'react';

const { TextArea } = Input;
let inputValue: string;
let textareaValue: string;
let currentEditObject: noteItem;

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
  const inputRef = useRef(null);
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
  const exportCSV = () => {
    let array: noteItem[] = NotesStorageAPI.getAllNotes();
    setcsvData(array);
  }
  const handleImportClick = (e) => {
    inputRef.current.click();
  }

  const handleFile = (e) => {
    let file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = (e) => {
      let importlists: noteItem[];
      e.target !== null ? importlists = CSVToJSON(e.target.result) : importlists = [];
      importlists.map((item) => { NotesStorageAPI.setItem(item) })
    }
    reader.readAsText(file);
  }
  const doSave = () => {
    if (!inputValue) {
      lv2modal.error(config);
    }
    else {
      if (!currentEditObject) {
        // it's new
        let submitObject: noteItem = NotesStorageAPI.requestNewItem();
        submitObject.title = inputValue;
        submitObject.content = textareaValue;
        NotesStorageAPI.setItem(submitObject);
        setOpen(false);
      }
      else {
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
        <CsvDownloadButton data={csvData} onMouseOver={exportCSV} style={{ marginTop: '3em', marginBottom: "2em" }}>Export Notes(CSV)</CsvDownloadButton>
        <Button  onClick={handleImportClick}>Import Notes(CSV)
          <input ref={inputRef} id="fileSelect" type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={handleFile} style={{ display: 'none' }} />
        </Button>
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
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    switch (e.currentTarget.nodeName) {
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