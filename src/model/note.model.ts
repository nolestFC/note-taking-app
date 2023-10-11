export type noteItem = {
    id: string;
    title: string;
    content: string;
    createdtime: string;
    updatedtime: string;
    deleted: number | 0;
}

export type noteItemList = Array<noteItem>

export type currentInputs = {
    inputValue: string;
    textAreaValue: string;
}