import { createContext } from 'react';
import { noteItem,noteItemList } from '../model/note.model';
export const NoteslistContext = createContext<noteItem[]>([]);
