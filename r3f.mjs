import reactThree from "@react-three/eslint-plugin";

/** @type {Awaited<import('typescript-eslint').Config>} */
export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@react-three": reactThree,

    },
    rules: {
      ...reactThree.configs.recommended.rules,
      ...reactThree.configs.all.rules
    }
  }
];
