import React from 'react';
import Button from './Button';
import Tooltip from './Tooltip';

const EditButtons = ({
  createMode,
  editMode,
  isCurrentUserId,
  handleEditButton,
  handleCloseButton,
  handleDeleteButton,
  handleSaveButton
}) => {
  return (
    <div className="edit_buttons">
      {!createMode && !editMode && isCurrentUserId && (
        <Button classes="icon" onClick={handleEditButton}>
          <Tooltip direction="top" text="Edit">
            <i className="fa fa-edit"></i>
          </Tooltip>
        </Button>
      )}
      {(createMode || (editMode && isCurrentUserId)) && (
        <div className="button_group_edit">
          <Button classes="icon" onClick={handleCloseButton}>
            <Tooltip direction="top" text="Cancel">
              <i className="fa fa-times"></i>
            </Tooltip>
          </Button>
          <Button classes="icon">
            <Tooltip direction="top" text="Delete">
              <i className="fas fa-trash" onClick={handleDeleteButton}></i>
            </Tooltip>
          </Button>
          <Button classes="icon" onClick={handleSaveButton}>
            <Tooltip direction="top" text="Save">
              <i class="fa fa-save"></i>
            </Tooltip>
          </Button>
        </div>
      )}
    </div>
  );
};

export default EditButtons;
