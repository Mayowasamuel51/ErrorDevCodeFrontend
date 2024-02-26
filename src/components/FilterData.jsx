/* eslint-disable react/prop-types */
import Input from '@mui/joy/Input';
import Button from "@mui/material/Button";
import FilterIcon from "@mui/icons-material/Filter";
import { useState } from 'react'
import * as React from 'react';
import { Box, Menu } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

export const FilterData = ({columnFilters, setcolumnFilters}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setcolumnFilters((prev)=> {
            const description = prev.find(filter => filter.id === "description")?.value
            // if (!description) {
            //     return prev.concat({
            //         id: "description",
            //         value: description
            //     })
            // }
        })
        setAnchorEl(null);
    };
    const filterInput = columnFilters?.find((data)=> data.id === "url")?.value ?? ""

    const onFilterChange = (id, value)=> {
        setcolumnFilters(prev => prev?.filter((data)=> data.id !== id).concat({id, value}))
    }

    return (
        <div className="relative flex gap-3 items-center">
            <Input
                startDecorator={<FilterIcon />}
                sx={{ width: 300 }}
                value={filterInput}
                onChange={(e)=> onFilterChange("url", e.target.value)}
            ></Input>
             <Tooltip title="Filter by">
                <Button
                    id="demo-positioned-button"
                    aria-controls={open ? 'demo-positioned-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    variant="contained"
                >
                    Filter By
                </Button>
              </Tooltip>
            <div className="absolute right-0">
                <Menu
                    className=''
                    id=""
                    aria-labelledby=""
                    anchorEl={anchorEl}
                    open={Boolean(open)}
                    onClose={handleClose}
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                    }}
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                    }}
                >
                    <MenuItem onClick={()=>handleClose()} >Url</MenuItem>
                    <MenuItem onClick={()=>handleClose()} >Date</MenuItem>
                    <MenuItem onClick={()=>handleClose()} >Description</MenuItem>
                </Menu>
            </div>
        </div>
    )
}
