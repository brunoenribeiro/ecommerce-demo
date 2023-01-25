import { useMemo } from 'react';
import Button from "@components/Button";
import cloudinary from "@api/cloudinary";

function AddProductToCartButton({ productId, cloudinaryPublicImageId, productPrice, productSlug, imageUrl: rawImageUrl, productName, children = "Add to Cart" }) {
    const imageUrl = useMemo(() => {
        if (cloudinaryPublicImageId) {
            return cloudinary.image(cloudinaryPublicImageId).quality('auto').format('auto').toURL();
        }

        return rawImageUrl;
    }, [cloudinaryPublicImageId, rawImageUrl])

    return (
        <Button
            className="snipcart-add-item"
            data-item-id={productId}
            data-item-price={productPrice}
            data-item-url={`/products/${productSlug}`}
            data-item-image={imageUrl}
            data-item-name={productName}
        >
            {children}
        </Button>
    )
}

export default AddProductToCartButton;
