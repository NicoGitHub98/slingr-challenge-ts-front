import type { ShoppingItem } from '../entities/ShoppingItem'
// import { LOCAL_STORAGE_KEY } from '../constants'

const baseFetchPostConfig = {
    headers: {
        'Content-Type': 'application/json' 
    }
}

export const getShoppingList = async () => {
    let shoppingList: Array<ShoppingItem> = [];
    try {
        const response = await fetch('http://localhost:8080/tasks/') 
        shoppingList = (await response.json()).tasks;
    } catch (err) {
        console.log(err)
        throw err
    }
    /*
    ** We could leverage offline use with session/local storage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(shoppingList)) 
    */
    return shoppingList;
}

export const createShoppingItem = async (item: ShoppingItem) => {
    let newShoppingItem: ShoppingItem;
    try {
        const response = await fetch('http://localhost:8080/tasks/', {
            ...baseFetchPostConfig,
            method: 'POST',
            body: JSON.stringify(item),
        }) 
        newShoppingItem = (await response.json()).task;
    } catch (err) {
        console.log(err)
        throw err
    }
    return newShoppingItem
}

export const editShoppingItem = async (editedItem: ShoppingItem) => {
    let editedShoppingItem: ShoppingItem;
    try {
        const response = await fetch(`http://localhost:8080/tasks/${editedItem.id}`, {
            ...baseFetchPostConfig,
            method: 'PUT',
            body: JSON.stringify(editedItem),
        }) 
        editedShoppingItem = (await response.json()).task;
    } catch (err) {
        console.log(err)
        throw err
    }
    return editedShoppingItem;
}

export const deleteShoppingItem = async (itemToDelete: ShoppingItem) => {
    let deletedItem: ShoppingItem;
    try {
        const response = await fetch(`http://localhost:8080/tasks/${itemToDelete.id}`, {
            method: 'DELETE'
        }) 
        deletedItem = (await response.json()).task;
    } catch (err) {
        console.log(err)
        throw err
    }
    return deletedItem;
}