function OpenCartButton({children}) {
    return (
        <button
            type="button"
            className="snipcart-checkout"
            aria-label="Open cart"
        >
            {children}
        </button>
    )
}

export default OpenCartButton;
