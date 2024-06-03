import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import type { ShoppingItem } from '../../entities/ShoppingItem'

import './styles.scss'

type Props = {
    item: ShoppingItem
    isOpen: boolean;
    toggleOpen: (e?: React.KeyboardEvent | React.MouseEvent) => void;
    handleDelete: (item: ShoppingItem) => void
};

export default function DeleteModal(props: Props) {
    const { item, isOpen, toggleOpen, handleDelete } = props

    return (
        <Dialog
            className="delete-modal"
            open={isOpen}
            onClose={() => toggleOpen()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Delete Item?
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this item? This can not be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button className="delete-modal__button--secondary" onClick={toggleOpen}>Cancel</Button>
                <Button className="delete-modal__button--primary" onClick={() => handleDelete(item)} variant="contained">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}