import numberDecimalFix from './numberDecimalFix';

const convertInchesToCm = (inchLength:number, decimals = 2) => {
  return numberDecimalFix(inchLength * 2.54, decimals);
};

export default convertInchesToCm;
