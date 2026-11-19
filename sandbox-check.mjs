// Live check of the agent's sandbox on this runner: writes outside the project are blocked, the network goes only to
// the package registries. Usage: node sandbox-check.mjs <unpacked package dir>
import { mkdtempSync, existsSync, rmSync } from 'node:fs';
import { tmpdir, homedir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const pkg = resolve(process.argv[2] || 'package');
const { toolByName } = await import(pathToFileURL(join(pkg, 'src/tools.js')));
const { detectSandbox } = await import(pathToFileURL(join(pkg, 'src/sandbox.js')));
const win = process.platform === 'win32';
const d = detectSandbox();
console.log('platform', process.platform, 'sandbox', d);
if (!d.kind) process.exit(1);
const cwd = mkdtempSync(join(homedir(), 'proj-'));
const outside = join(homedir(), 'outside-' + Date.now() + '.txt');
const sb = { active: true, kind: d.kind, network: 'allowlist', allowWrite: [], allowHosts: [] };
const sh = toolByName('shell');
const run = async (command, t = 180) => { const r = await sh.run({ command, timeout_sec: t }, { cwd, sandbox: sb }); console.log(`\n$ ${command}\n${r}`); return r; };
const results = {};
// Quotes inside a command line (cmd.exe on Windows), outside the sandbox and inside it.
const q = win ? 'echo q> "with space.txt"' : "echo q > 'with space.txt'";
console.log(await sh.run({ command: q }, { cwd, sandbox: null }));
results.quotesUnsandboxed = existsSync(join(cwd, 'with space.txt')); rmSync(join(cwd, 'with space.txt'), { force: true });
await run(q);
results.quotesSandboxed = existsSync(join(cwd, 'with space.txt'));
await run(win ? 'echo hi> inside.txt' : 'echo hi > inside.txt');
results.writeInside = existsSync(join(cwd, 'inside.txt'));
await run(win ? `echo x> "${outside}"` : `echo x > '${outside}'`);
results.writeOutsideBlocked = !existsSync(outside);
const npm = await run('npm init -y && npm install left-pad --no-audit --no-fund');
results.npmInstall = existsSync(join(cwd, 'node_modules', 'left-pad'));
await run(`${win ? 'python' : 'python3'} -m pip install --disable-pip-version-check --target pylib six`);
results.pipInstall = existsSync(join(cwd, 'pylib', 'six.py'));
const ex = await run('curl -sS -m 15 -o NUL -w "%{http_code}" https://example.com/'.replace('NUL', win ? 'NUL' : '/dev/null'));
results.otherHostClosed = !/\b200\b/.test(ex.split('\n')[0]);
results.closedHostReported = /example\.com/.test(ex);
if (!win) { const by = await run(`curl -sS -m 10 --noproxy '*' -o /dev/null -w '%{http_code}' https://example.com/`); results.noBypass = !/^200/.test(by); }
const gh = await run(`curl -sS -m 15 -o ${win ? 'NUL' : '/dev/null'} -w "%{http_code}" https://github.com/`);
results.githubOpen = /^(200|301|302)/.test(gh.trim());
console.log('\nRESULTS', JSON.stringify(results, null, 1));
try { rmSync(outside, { force: true }); } catch {}
process.exit(Object.values(results).every(Boolean) ? 0 : 1);
