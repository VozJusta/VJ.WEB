import storybook from "eslint-plugin-storybook";

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  ...storybook.configs["flat/recommended"],
  {
    rules: {
      // Padrão canônico de hooks de dados do projeto (ver context.md §6):
      // `useEffect(() => { fetchData(); }, [fetchData])`. A regra nova do
      // plugin React sinaliza esse uso como erro; mantemos como aviso para
      // não bloquear o CI sem refatorar toda a camada de hooks.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
]);

export default eslintConfig;
