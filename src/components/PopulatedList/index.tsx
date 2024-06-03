import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ShoppingItem, { type Props as ShoppingItemProps } from '../ShoppingItem'
import { ACTIONS } from '../../constants'

import './styles.scss'

type Props = {
    items: Array<ShoppingItemProps['item']>
    handleSelection: (action: ACTIONS, item?: any ) => void
}

const PopulatedList: React.FC<Props> = (props) => {
    const { items, handleSelection } = props;

    return (
        <Box className="populated-list">
            <div className='populated-list__header'>
                <h5 className='populated-list__title'>Your Items: </h5>
                <Button className='populated-list__button' variant="contained" onClick={()=>handleSelection(ACTIONS.EDIT)}>Add item</Button>
            </div>
            <Box className="populated-list__items">
                {items.map(item => <ShoppingItem key={item.id} item={item} handleSelection={handleSelection} />)}
            </Box>
        </Box>
    )
}

export default PopulatedList;