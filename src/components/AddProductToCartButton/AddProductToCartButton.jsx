import Button from "@components/Button";

function AddProductToCartButton({ productId, productPrice, productSlug, imageUrl, productName, children = "Add to Cart" }) {
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
