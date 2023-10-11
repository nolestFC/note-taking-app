import { noteItem, noteItemList } from '../model/note.model';
export default class NotesStorageAPI {
    static savingKey = 'notesapp-notes';
    static idPrefix = '__noteid__';
    static init(): void {
        if(!window.localStorage) {
            console.log('browser did not support localStorage');
        }
        //init mockData
        this.mockData();
    }
    static mockData(): void {
        let mocklist: noteItem[] = [];
        const data0:noteItem = {
            id: this.idPrefix + '2023-10-11T16:43:50.574Z',
            title: 'My First Note',
            content: 'Welcome to Coats',
            createdtime: '2023-10-11T16:43:50.574Z',
            updatedtime: '2023-10-11T16:43:50.574Z',
            deleted: 0
        }
        const data1:noteItem = {
            id: this.idPrefix + '2023-10-11T16:45:54.429Z',
            title: 'My Second Note',
            content: 'Welcome to interview test',
            createdtime: '2023-10-11T16:45:54.429Z',
            updatedtime: '2023-10-11T16:45:54.429Z',
            deleted: 0
        }
        mocklist.push(data0);
        mocklist.push(data1);
        if(!localStorage.getItem(this.savingKey)){
            localStorage.setItem(this.savingKey, JSON.stringify(mocklist));
        }
    }
    static requestNewItem(): noteItem {
        let item: noteItem = {
            id: this.getNewID(),
            title: '',
            content: '',
            createdtime: new Date().toISOString(),
            updatedtime: new Date().toISOString(),
            deleted: 0
        }
        return item
    }
    static setItem(item: noteItem): Number {
        if(item.title) {
            let isExist: Boolean = false;
            const record = localStorage.getItem(this.savingKey);
            let recordArray:noteItem[] = record !== null ? JSON.parse(record):'';
            for(let i = 0; i < recordArray.length; i++) {
                if(recordArray[i]['id'] == item.id) {
                    isExist = true;
                    break;
                }
            }
    
            if(isExist){
                // update
                let tempArray:noteItem[] = [];
                for(let i = 0; i < recordArray.length; i++) {
                    if(recordArray[i]['id'] == item.id) {
                        recordArray[i]['title'] = item.title;
                        recordArray[i]['content'] = item.content;
                        recordArray[i]['updatedtime'] = new Date().toISOString();
                    }
                    tempArray.push(recordArray[i])
                }
                localStorage.setItem(this.savingKey, JSON.stringify(tempArray));
            }
            else{
                // create
                item.updatedtime = new Date().toISOString();
                recordArray.push(item)
                localStorage.setItem(this.savingKey, JSON.stringify(recordArray));
            }
            location.reload()
            //window.dispatchEvent(new Event("storage"));
            return 1
        }
        else{
            return 0
        }
    }
    static getItem(id: string): noteItem {
        const record = localStorage.getItem(this.savingKey);
        let recordArray = record !== null ? JSON.parse(record):'';
        const note = recordArray.filter((note:noteItem) => note.id == id);
        return note
    }
    static deleteItem(id: string): number {
        const notes = this.getAllNotes();
        const newNotes = notes.filter((note) => note.id != id);
        localStorage.setItem(this.savingKey, JSON.stringify(newNotes));
        location.reload()
        //window.dispatchEvent(new Event("storage"));
        return 1
    }
    static getAllNotes():noteItem[] {
        const record = localStorage.getItem(this.savingKey);
        let recordArray = record !== null ? JSON.parse(record):'';
        let list:noteItem[] = []; 
        for( let key in recordArray) {
            if(recordArray[key] && recordArray[key]['id'].indexOf(this.idPrefix) !== -1) {
                list.push(recordArray[key]);
            }
        }
        return list.sort((a, b) => {
            return new Date(a.updatedtime) > new Date(b.updatedtime) ? -1 : 1;
        });
    }
    static getNewID(): string {
        return this.idPrefix + new Date().toISOString();
    }
}