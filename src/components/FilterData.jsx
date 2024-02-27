/* eslint-disable react/prop-types */
import Input from '@mui/joy/Input';
import Button from "@mui/material/Button";
import { useState } from 'react'
import * as React from 'react';
import { Box, Menu } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { FaFilter } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";

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
        <div className="flex justify-between items-center">
            <div className="relative flex gap-3">
                <Input
                    startDecorator={<FaFilter />}
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
                        <FaFilter size={20} />
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


            <div className="flex gap-3 items-center">
                <div className="border-2 border-[#f2f2f2] rounded-lg">
                    <MdRefresh size={30} color='#f2f2f2' />
                </div>
                <div className="border-2 border-[#f2f2f2] rounded-lg">
                    <TbListDetails size={30} color='#f2f2f2' />
                </div>
            </div>
        </div>
    )
}
