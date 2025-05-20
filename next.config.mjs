import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "exam.elevateegy.com",
        port: "",
        pathname: "/uploads/**",
        search: "",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
