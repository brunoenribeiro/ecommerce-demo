import { useMemo } from "react";
import Image from "next/image";
import cloudinary from "@api/cloudinary";

function CloudinaryImage({ publicId, className, width, height, alt, quality = 'auto', format = 'auto' }) {
    const imageUrl = useMemo(
        () => cloudinary
            .image(publicId)
            .resize(`w_${width},h_${height}`)
            .quality(quality)
            .format(format)
            .toURL(),
        [publicId, width, height, quality, format]
    );

    return (
        <Image
            className={className}
            width={width}
            height={height}
            src={imageUrl}
            alt={alt}
        />
    );
}

export default CloudinaryImage;
