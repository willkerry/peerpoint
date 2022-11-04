/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = async () => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    poweredByHeader: false,
    swcMinify: true,
    async headers() {
      return [
        {
          source: "/:path*",
          headers: [
            {
              key: "X-Powered-By",
              value: "COBOL Server Home Edition 1996",
            },
          ],
        },
      ];
    },
  };
  const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
  });
  return withBundleAnalyzer(nextConfig);
};
