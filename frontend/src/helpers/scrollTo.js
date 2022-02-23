// Scroll to a specified element
const scrollTo = (ref, margin = 0, behavior = 'smooth') => {
  window.scrollTo({
    top: ref.current.offsetTop - margin,
    behavior
  });
};

export default scrollTo;
