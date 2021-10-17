import React from 'react';
import Button from './Button';

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
        <Button types="icon" onClick={handleEditButton}>
          <i className="fa fa-edit"></i>
        </Button>
      )}
      {(createMode || (editMode && isCurrentUserId)) && (
        <div className="button_group_edit">
          <Button types="icon" onClick={handleCloseButton}>
            <i className="fa fa-times"></i>
          </Button>
          <Button types="icon">
            <i className="fas fa-trash" onClick={handleDeleteButton}></i>
          </Button>
          <Button types="icon" onClick={handleSaveButton}>
            <i class="fa fa-save"></i>
          </Button>
        </div>
      )}
    </div>
  );
};

export default EditButtons;
