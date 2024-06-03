import type { ShoppingItem } from '../entities/ShoppingItem'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getShoppingList = async () => {
    const strData = localStorage.getItem("my_shopping_list")
    let shoppingList: Array<ShoppingItem> = [];
    if (strData) {
        shoppingList = JSON.parse(strData)
    }
    await sleep(Math.random() * 500)
    return shoppingList
}

export const createShoppingItem = async (item: ShoppingItem) => {
    const strData = localStorage.getItem("my_shopping_list")
    let shoppingList: Array<ShoppingItem> = [];
    if (strData) {
        shoppingList = JSON.parse(strData)
    }
    shoppingList.push(item);
    localStorage.setItem("my_shopping_list", JSON.stringify(shoppingList))
    await sleep(Math.random() * 500)
    return shoppingList
}

export const editShoppingItem = async (editedItem: ShoppingItem) => {
    const strData = localStorage.getItem("my_shopping_list")
    const shoppingList = JSON.parse(strData!) as Array<ShoppingItem>
    const editedItems = shoppingList.map(item => item.id === editedItem.id ? editedItem : item);
    localStorage.setItem("my_shopping_list", JSON.stringify(editedItems))
    await sleep(Math.random() * 500)
    return editedItems
}

export const deleteShoppingItem = async (itemToDelete: ShoppingItem) => {
    const strData = localStorage.getItem("my_shopping_list")
    const shoppingList = JSON.parse(strData!) as Array<ShoppingItem>
    const editedItems = shoppingList.filter(item => item.id !== itemToDelete.id);
    localStorage.setItem("my_shopping_list", JSON.stringify(editedItems))
    await sleep(Math.random() * 500)
    return editedItems
}