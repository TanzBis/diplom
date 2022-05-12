import {useState} from "react";
import {Button, Menu, MenuItem} from "@mui/material";
import styles from './Navbar.module.sass';
import {NavLink} from "react-router-dom";

const DropDownMenu = ({logout}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = e => setAnchorEl(e.currentTarget)
    const handleClose = () => setAnchorEl(null);
    const handleLogout = () => {
        logout();
        handleClose();
    };

    return (
        <>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className={styles.menu}
            >
                Меню
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>
                    <NavLink to='/add-quiz' className={styles.addQuiz}>Добавить Квиз</NavLink>
                </MenuItem>
                <MenuItem onClick={handleClose}>Квизы</MenuItem>
                <MenuItem onClick={handleLogout}>Выйти</MenuItem>
            </Menu>
        </>
    );
};
export default DropDownMenu