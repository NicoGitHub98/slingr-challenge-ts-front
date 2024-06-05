import { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
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
  const [showSnackbar, setShowSnackbar] = useState(false);

  const [fetchData, setFetchData] = useState(0)

  useEffect(() => {
    setLoading(true)
    getShoppingList()
      .then((data) => {
        setItemList(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error loading shoppingList: ", error);
        setLoading(false)
        setShowSnackbar(true)
      })
  }, [fetchData])

  const handleAdd = (item: any) => {
    setLoading(true)
    createShoppingItem(item)
      .then((data) => {
        setFetchData(prev => ++prev)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error creating shoppingList item: ", error);
        setLoading(false)
        setShowSnackbar(true)
      })
  }
  const handleEdit = (newItem: any) => {
    setLoading(true);
    editShoppingItem(newItem)
      .then((data) => {
        setFetchData(prev => ++prev)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error editing shoppingList item: ", error);
        setLoading(false)
        setShowSnackbar(true)
      })
  }
  const handleDelete = (itemToDelete: any) => {
    setLoading(true);
    setIsModalOpen(false);
    deleteShoppingItem(itemToDelete)
      .then(
        (data) => {
          setSelectedItem(null)
          setLoading(false)
          setFetchData(prev => ++prev)
        }
      )
      .catch((error) => {
        console.error("Error deleting shoppingList item: ", error);
        setLoading(false)
        setShowSnackbar(true)
      })



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
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={showSnackbar}
          onClose={(e) => setShowSnackbar(false)}
          key={"ErrorSnackbar"}
        >
          <Alert
            onClose={(e) => setShowSnackbar(false)}
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}
          >
            There was an error performing your last action, please try again
          </Alert>
        </Snackbar>
      </div>
    </>
  )
}

export default ShoppingList
