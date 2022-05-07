import ProductImageType from '../ProductImageType';

interface ProductScreenImageSidebarProps {
  images: ProductImageType[];
  setSelectedImage: Dispatch<SetStateAction<images>>;
}
export default ProductScreenImageSidebarProps;
