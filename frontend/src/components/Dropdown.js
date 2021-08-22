import { Dropdown } from 'react-bootstrap';

const DropDown = ({
  options,
  selected,
  onSelectedChange,
  dropDownToggleId,
  className,
  classNameMenu
}) => {
  const renderedOptions = options.map((option) => {
    return (
      <Dropdown.Item key={option} onClick={() => onSelectedChange(option)}>
        {option}
      </Dropdown.Item>
    );
  });

  return (
    <Dropdown>
      <Dropdown.Toggle className={className} variant="success" id={dropDownToggleId}>
        {selected}
      </Dropdown.Toggle>

      <Dropdown.Menu className={classNameMenu}>{renderedOptions}</Dropdown.Menu>
    </Dropdown>
  );
};


DropDown.defaultProps = {
  onSelectedChange: () => {}
};

export default DropDown;
