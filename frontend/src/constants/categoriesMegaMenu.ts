const categoriesMegaMenu: { [key: string]: { [key: string]: { [key: string]: string } } } = {
  'Phones, Tablets & Laptops': {
    'Mobile Phones & Accessories': {},
    'Tablets & Accessories': {},
    'Laptops & Accessories': {
      Laptops: '/productlist'
    },
    'Gadgets & Smart Technologies': {}
  },

  'Computers & Peripherals': {},
  'TV, Audio & Photo': {},
  Gaming: {},
  'Large appliances': {},
  'Small appliances': {},
  Fashion: {},
  'Health and Beauty': {},
  'Home, Garden & Petshop': {},
  "Toys & Children's Items": {},
  'Sports & leisure': {},
  'Auto & DIY': {},
  'Books, Office & Food': {}
};

export default categoriesMegaMenu;

// const categories = {
//   main: {
//     mid: {
//       sub: 'sub',
//       sub2: 'sub2',
//       .....
//     }
//   }
// };
