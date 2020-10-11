import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Button } from '@material-ui/core';

const Action = ({items, onAction}: {items: {name: string, id: number} [], onAction: (actionType: string) => void}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (actionTYpe: string) => {
    setAnchorEl(null);
    onAction(actionTYpe);
  };

  return (
    <div>
      <Button onClick={handleClick}>
      <MoreVertIcon  />
      </Button>
      <Menu
        id="actions-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {items.map((item) => <MenuItem key={item.id} onClick={() => handleClose(item.name)}>{item.name}</MenuItem> )}
      </Menu>
    </div>
  );
}

export default Action;
