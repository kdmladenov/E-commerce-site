import numberDecimalFix from './numberDecimalFix';

const convertPoundToKg = (poundWeight: number, decimals = 2) => {
  return numberDecimalFix(poundWeight / 2.2046, decimals);
};

export default convertPoundToKg;
