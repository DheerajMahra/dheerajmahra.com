import baseConfig from "@dheerajmahra/prettier-config";

/** @type {import("prettier").Config} */
export default {
  ...baseConfig,
  plugins: ["prettier-plugin-tailwindcss"]
};
