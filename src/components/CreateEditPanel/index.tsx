import React, { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import LastPageIcon from '@mui/icons-material/LastPage';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import type { ShoppingItem } from '../../entities/ShoppingItem'

import './styles.scss'

type Props = {
    isOpen: boolean;
    toggleOpen: (e?: React.KeyboardEvent | React.MouseEvent) => void;
    item?: ShoppingItem;
    handleAdd: (item: ShoppingItem) => void
    handleEdit: (item: ShoppingItem) => void
}

const WORDINGS = {
    CREATE: {
        title: 'Add an Item',
        subtitle: 'Add your new item below',
        status: null,
        primaryAction: "Add Task"
    },
    EDIT: {
        title: 'Edit an Item',
        subtitle: 'Edit your item below',
        status: 'Purchased',
        primaryAction: "Save Item"
    }
}


const CreateEditPanel = ({ isOpen, toggleOpen, item, handleAdd, handleEdit }: Props) => {
    useEffect(() => {
        setId(item?.id)
        setName(item?.name);
        setDescription(item?.description)
        setAmount(item?.amount)
        setPurchased(item?.purchased || false)
    }, [item?.id])
    const [id, setId] = useState(item?.id);
    const [name, setName] = useState(item?.name);
    const [description, setDescription] = useState(item?.description);
    const [amount, setAmount] = useState(item?.amount);
    const [purchased, setPurchased] = useState(item?.purchased || false);
    const wordings = item ? WORDINGS.EDIT : WORDINGS.CREATE

    const clearState = () => {
        setId('');
        setName('');
        setDescription('');
        setAmount('')
        setPurchased(false)
    }

    const handleAddEditItem = () => {
        const newItem = {
            id: id || crypto.randomUUID(),
            name: name!,
            description: description!,
            amount: amount!,
            purchased: purchased!
        }
        if (item) {
            handleEdit(newItem)
        } else {
            handleAdd(newItem)
            clearState();
        }
        toggleOpen();
    }

    const handleCancel = () => {
        if (!item) {
            clearState(); // Only clear state if cancel on new item
        }
        toggleOpen();
    }


    return (
        <Drawer
            className='create-edit-panel'
            anchor="right"
            open={isOpen}
            onClose={() => toggleOpen()}
        >
            <AppBar className="panel-navbar" position="static">
                <Typography className="panel-navbar__title" variant="h6" component="span" sx={{ flexGrow: 1 }}>
                    SHOPPING LIST
                </Typography>
                <LastPageIcon style={{ cursor: 'pointer', color: '#555F7C' }} onClick={toggleOpen} />
            </AppBar>
            <div className='panel-body'>
                <Typography className="panel-body__title" variant="h6" component="h5" sx={{ flexGrow: 1 }}>
                    {wordings.title}
                </Typography>
                <Typography className="panel-body__subtitle" variant="h6" component="h6" sx={{ flexGrow: 1 }}>
                    {wordings.subtitle}
                </Typography>

                <div className='panel-body__inputs'>
                    <TextField
                        label="Item Name"
                        fullWidth
                        value={name}
                        onChange={(event) => setName(event.target.value)} />
                    <TextField
                        fullWidth
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                    <FormControl className=''>
                        <InputLabel id="demo-simple-select-label">How Many?</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={amount}
                            label="How Many?"
                            onChange={(event) => setAmount(event.target.value)}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                        </Select>
                    </FormControl>
                    {wordings.status && <FormControlLabel control={<Checkbox value={purchased} checked={purchased} onChange={(event) => setPurchased(event.target.checked)} />} label={wordings.status} />}
                </div>
            </div>
            <div className='panel-footer'>
                <Button className='panel-footer__button--secondary' variant="text" onClick={handleCancel}>Cancel</Button>
                <Button
                    className='panel-footer__button--primary'
                    variant="contained"
                    onClick={handleAddEditItem}>
                    {wordings.primaryAction}
                </Button>
            </div>
        </Drawer>
    )
}

export default CreateEditPanel;