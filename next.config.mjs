/** @type {import('next').NextConfig} */
const nextConfig = {

  reactStrictMode:true,

  async rewrites() {
    return [
      {
        source: "/makeup/:path*",
        destination: "http://makeup-api.herokuapp.com/api/:path*",
      },
      {
        source: "/guestbook/:path*",
        destination: "http://localhost:8080/api/guestbook/:path*",
      },
    ];
  }
  



};

export default nextConfig;
