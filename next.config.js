/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*", // Match all pages
        headers: [
          {
            key: "referrer-policy",
            value: "no-referrer",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
