import numberDecimalFix from './numberDecimalFix';

 const convertPoundToKg = (poundWeight, decimals = 2) => {
  return numberDecimalFix(poundWeight / 2.2046, decimals);
};

export default convertPoundToKg
