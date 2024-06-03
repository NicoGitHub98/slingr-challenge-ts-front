import { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Navbar from '../../components/Navbar'
import EmptyList from '../../components/EmptyList'
import PopulatedList from '../../components/PopulatedList'
import CreateEditPanel from '../../components/CreateEditPanel'
import DeleteModal from '../../components/DeleteModal'
import type { ShoppingItem } from '../../entities/ShoppingItem'
import { type ACTIONS } from '../../constants'
import { getShoppingList, createShoppingItem, editShoppingItem, deleteShoppingItem } from '../../api/shoppingList'
import './styles.css'

function ShoppingList() {
  const [itemList, setItemList] = useState<Array<ShoppingItem>>([])
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true)
    getShoppingList().then(
      (data) => {
        setItemList(data)
        setLoading(false)
      }
    )
  },[])

  const handleAdd = (item: any) => {
    setLoading(true)
    createShoppingItem(item).then(
      (data) => {
        setItemList(data)
        setLoading(false)
      }
    )
  }
  const handleEdit = (newItem: any) => {
    setLoading(true);
    editShoppingItem(newItem).then(
      (data) => {
        setItemList(data)
        setLoading(false);
      }
    )
  }
  const handleDelete = (itemToDelete: any) => {
    setLoading(true);
    deleteShoppingItem(itemToDelete).then(
      (data) => {
        setItemList(data)
        setIsModalOpen(false);
        setSelectedItem(null)
        setLoading(false)
      }
    )


  }
  const handleItemSelection = (action: ACTIONS, item?: ShoppingItem) => {
    setSelectedItem(item);
    if (action === 'edit') {
      setIsPanelOpen((prev) => !prev);
    }
    if (action === 'delete') {
      setIsModalOpen((prev) => !prev);
    }
  }


  const toggleDrawer = (event?: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setIsPanelOpen((prev) => !prev);
  };

  return (
    <>
      <div className='shopping-list'>
        <Navbar title="SHOPPING LIST" />
        {
          loading ? (
            <Box className="spinner">
              <CircularProgress size={86} />
            </Box>
          ) : itemList.length ? (
            <PopulatedList items={itemList} handleSelection={handleItemSelection} />
          ) : (
            <EmptyList openPanel={toggleDrawer} />
          )
        }
        <CreateEditPanel item={selectedItem} isOpen={isPanelOpen} toggleOpen={toggleDrawer} handleAdd={handleAdd} handleEdit={handleEdit} />
        <DeleteModal item={selectedItem} isOpen={isModalOpen} toggleOpen={() => setIsModalOpen(prev => !prev)} handleDelete={handleDelete} />
      </div>
    </>
  )
}

export default ShoppingList
