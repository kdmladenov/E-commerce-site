interface ProductScreenImageSidebarProps {
  images: {
    productImageId: number;
    productId: number;
    image: string;
    isMain: boolean;
    isDeleted: boolean;
  }[];
  setSelectedImage: Dispatch<SetStateAction<images>>;
}
export default ProductScreenImageSidebarProps;
