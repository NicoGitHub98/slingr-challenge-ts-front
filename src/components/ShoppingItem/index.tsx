import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import type { ShoppingItem } from '../../entities/ShoppingItem'
import { ACTIONS } from '../../constants'

import './styles.scss'

type Props = {
    item: ShoppingItem;
    handleSelection: (action: ACTIONS, item: any) => void
}

const ShoppingItem: React.FC<Props> = (props) => {
    const { item, handleSelection } = props;
    const [purchased, setPurchased] = useState(item.purchased)
    useEffect(() => { 
        setPurchased(item.purchased)
    }, [item.purchased])

    return (
        <Box className="shopping-item" position="static">
            <Checkbox id={`shopping-item${item.id}`} className="shopping-item__checkbox" checked={purchased} disabled/>
            <div className='shopping-item__texts'>
                <Typography className={`shopping-item__title${item.purchased ? '--purchased' : ''}`} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {item.name}
                </Typography>
                <Typography className={`shopping-item__description${item.purchased ? '--purchased' : ''}`} variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
                    {item.description}
                </Typography>
            </div>
            <ModeEditOutlinedIcon sx={{ cursor: 'pointer' }} onClick={() => handleSelection(ACTIONS.EDIT, item)} />
            <DeleteOutlinedIcon sx={{ cursor: 'pointer' }} onClick={() => handleSelection(ACTIONS.DELETE, item)} />
        </Box>
    )
}

export default ShoppingItem;