const path = require("path")

const i18n = {
  locales: ["ja", "en"],
  defaultLocale: "ja"
}

const nextConfig = {
  i18n: i18n,
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  staticPageGenerationTimeout: 1000,
  async redirects() {
    return [
      {
        source: "/posts/:category/:slug*",
        destination: "/techblog/posts/:slug*",
        permanent: true,
      }
    ];
  },

  webpack(config, options) {
    config.resolve.alias["@component"] = path.join(__dirname, "component");
    config.resolve.alias["@libs"] = path.join(__dirname, "libs");

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  }
};

module.exports = nextConfig;