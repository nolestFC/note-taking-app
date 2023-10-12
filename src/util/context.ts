import { createContext } from 'react';
import { noteItem,noteItemList } from '../model/note.model';
export const NoteslistContext = createContext<noteItem[]>([]);

// 欠
// 全局状态管理
// 父子组件传复杂参数方式
// 生命周期函数