/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      "graqhql-server-app.onrender.com",
      "images.unsplash.com",
      "res.cloudinary.com",
    ],
  },
};

export default nextConfig;
