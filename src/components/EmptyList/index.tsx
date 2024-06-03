import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import './styles.scss'

type Props = {
    openPanel: (e: React.KeyboardEvent | React.MouseEvent) => void;
}

const Navbar: React.FC<Props> = (props) => {
    const { openPanel } = props;
    return (
        <Box className="empty-list">
            <h5 className='empty-list__title'>Your shopping list is empty :(</h5>
            <Button className='empty-list__button' variant="contained" onClick={openPanel}>Add your first item</Button>
        </Box>
    )
}

export default Navbar;