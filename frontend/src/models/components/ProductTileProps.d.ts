import CartItemType from '../CartItemType';
import HistoryType from '../HistoryType';
import ProductType from '../ProductType';
import WishType from '../WishType';

type ProductTileCartItemType = CartItemType & { brand?: string };

interface ProductTileProps {
  products: (ProductType | ProductTileCartItemType | HistoryType | WishType | undefined)[];
  header: string;
  itemSubtitleLine1?: keyof (ProductType | ProductTileCartItemType | HistoryType | WishType);
  itemSubtitleLine2?: keyof (ProductType | ProductTileCartItemType | HistoryType | WishType);
  footer?: string;
  footerLink?: string;
}
export default ProductTileProps;
