import { Dropdown } from 'react-bootstrap';
// import PropTypes from 'prop-types';

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

// DropDown.defaultProps = {
//   fullName: '',
//   itemCount: 0
// };

// DropDown.propTypes = {
//   options: PropTypes.oneOfType([
//     PropTypes.arrayOf(
//       PropTypes.shape({
//         label: PropTypes.string.isRequired,
//         value: PropTypes.string.isRequired
//       })
//     ),
//     PropTypes.arrayOf(
//       PropTypes.shape({
//         label: PropTypes.number.isRequired,
//         value: PropTypes.number.isRequired
//       })
//     )
//   ]).isRequired,
//   // options: PropTypes.oneOfType([
//   //   PropTypes.arrayOf(PropTypes.object),
//   //   PropTypes.func,
//   // ]).isRequired,
//   selected: PropTypes.oneOfType([
//     PropTypes.shape({
//       label: PropTypes.string.isRequired,
//       value: PropTypes.string.isRequired
//     }),
//     PropTypes.shape({
//       label: PropTypes.number.isRequired,
//       value: PropTypes.number.isRequired
//     })
//   ]).isRequired,
//   onSelectedChange: PropTypes.func.isRequired,
//   dropDownToggleId: PropTypes.string.isRequired
// };
export default DropDown;
