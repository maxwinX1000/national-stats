// Entry program for the Nusantara Data site (Node 22, standard library
// only). The site itself lives in app/ beside this file as plain static
// files; screenshots/ holds the renders taken of it. Running this program
// hands the entry in: it copies app/ and screenshots/ into the output
// directory and writes dossier.json there, the summary the judge reads,
// using the vendored make.fun library. That library file must stay exactly
// as the kit shipped it, or the scorer's own copy will disagree.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const rootDir = fileURLToPath(new URL('.', import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outDir, { recursive: true });
cpSync(join(rootDir, 'app'), join(outDir, 'app'), { recursive: true });
mkdirSync(join(outDir, 'screenshots'), { recursive: true });
if (existsSync(join(rootDir, 'screenshots'))) {
  cpSync(join(rootDir, 'screenshots'), join(outDir, 'screenshots'), { recursive: true });
}

// The caps match the scorer's gate: at most 4 screenshots, each at most
// 256 KiB; at most 993 files and 16 MiB under app/; the dossier text is
// capped at 160 KiB. An entry past any of these is refused here first,
// with the library's own message, instead of failing the gate silently.
writeFileSync(
  join(outDir, 'dossier.json'),
  buildDossier(outDir, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
