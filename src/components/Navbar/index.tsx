import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import React from 'react';

import './styles.scss'

type Props = {
    title: string
}

const Navbar: React.FC<Props> = (props) => {
    return (
        <>
            <AppBar className="navbar" position="static">
                <Typography className="navbar__title" variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {props.title}
                </Typography>
            </AppBar>
        </>
    )
}

export default Navbar;