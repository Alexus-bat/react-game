const setStorage = (name: string, value: any): void => {
    localStorage.setItem(name, JSON.stringify(value));
}

const getStorage = (name: string): any => {
    return JSON.parse(window.localStorage.getItem(name)!);
} 

const delStorage = (name: string): void => {
    localStorage.removeItem(name);
}

export {setStorage, getStorage, delStorage}
