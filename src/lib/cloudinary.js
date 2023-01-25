import { Cloudinary } from "@cloudinary/url-gen";

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: "dzshao5jm",
  },
  url: {
    secure: true,
  },
});

export default cloudinary;
