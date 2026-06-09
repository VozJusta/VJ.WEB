---
name: vercel-deploy-ci
description: Como o CI de deploy Vercel do VJ.WEB está configurado (secrets, org token)
metadata:
  type: project
---

O workflow `.github/workflows/vercel-deploy.yml` faz deploy na Vercel (push em `develop` → produção; PR → preview).

Fatos não-óbvios:
- `VERCEL_ORG_ID` (`team_QKCLxnn41jwuE9KAqnZKTtmy`) e `VERCEL_PROJECT_ID` (`prj_j8sc9NKOTnxXdD56K0HP8tBFLsKo`) foram cadastrados como **repo secrets** em 2026-06-02.
- `VERCEL_TOKEN` **não** é um repo secret — é herdado a nível de **organização VozJusta**. Por isso o deploy autentica sem cadastrar token no repo.
- O typecheck do CI exige `pnpm exec next typegen` antes do `tsc --noEmit`, pois `next-env.d.ts` (que declara módulos de assets `.svg`/`.png`) é gitignored.
- Preview deployments retornam HTTP 401 por causa da Deployment Protection da Vercel — não é falha de deploy.
- O gate de confiança usa "PR não-fork" (`head.repo.full_name == github.repository`), não `author_association` (que reporta CONTRIBUTOR para membros de org com membership privado).
