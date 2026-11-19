// Live check of the agent's computer control on this runner: screenshot, typing (with + ^ % and Cyrillic), keys.
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
const pkg = resolve(process.argv[2] || 'package');
const { COMPUTER_TOOL } = await import(pathToFileURL(join(pkg, 'src/computer.js')));
const run = (input) => COMPUTER_TOOL.run(input, { env: process.env });
const results = {};
if (process.platform === 'win32') {
  // Diagnostics: what PowerShell prints for the size query fed through stdin, as the tool does.
  const { spawnSync } = await import('node:child_process');
  const src = await import('node:fs').then((f) => f.readFileSync(join(pkg, 'src/computer.js'), 'utf8'));
  const prelude = eval('`' + src.split('const WIN_PRELUDE = `')[1].split('`;')[0] + '`');
  const r = spawnSync('powershell.exe', ['-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-Command', '-'], { input: prelude + '$b=[System.Windows.Forms.Screen]::PrimaryScreen.Bounds; "$($b.Width) $($b.Height)"', encoding: 'utf8' });
  console.log('STDIN status', r.status, 'OUT', JSON.stringify(r.stdout), 'ERR', JSON.stringify(r.stderr.slice(0, 1500)));
  const enc = Buffer.from(prelude + '$b=[System.Windows.Forms.Screen]::PrimaryScreen.Bounds; "$($b.Width) $($b.Height)"', 'utf16le').toString('base64');
  const r2 = spawnSync('powershell.exe', ['-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-EncodedCommand', enc], { encoding: 'utf8' });
  console.log('ENCODED status', r2.status, 'OUT', JSON.stringify(r2.stdout), 'ERR', JSON.stringify(r2.stderr.slice(0, 1500)));
}
const shot = await run({ action: 'screenshot' });
console.log(shot[0].text, 'jpeg bytes', Buffer.from(shot[1].source.data, 'base64').length);
results.screenshot = shot[1].source.media_type === 'image/jpeg' && shot[1].source.data.length > 1000;
if (process.platform === 'win32') {
  const ps = (c) => String(execFileSync('powershell.exe', ['-NoProfile', '-Command', c], { encoding: 'utf8' })).trim();
  await run({ action: 'open_app', name: 'notepad.exe' });
  await new Promise((r) => setTimeout(r, 2500));
  ps("$w=New-Object -ComObject WScript.Shell; [void]$w.AppActivate('Notepad')");
  const text = 'Hello 1+1=2 ^%~ (x) {y} [z] Привет';
  await run({ action: 'type', text });
  await run({ action: 'key', key: 'Ctrl+A' });
  await run({ action: 'key', key: 'Ctrl+C' });
  await new Promise((r) => setTimeout(r, 500));
  const got = ps('Get-Clipboard');
  console.log('typed:', JSON.stringify(got));
  results.typeAndKeys = got === text;
  await run({ action: 'move', x: 100, y: 100 });
  console.log(await run({ action: 'cursor' }));
  results.cursor = true;
}
console.log('RESULTS', JSON.stringify(results));
process.exit(Object.values(results).every(Boolean) ? 0 : 1);
