// Live check of the agent's computer control on this runner: screenshot, typing (with + ^ % and Cyrillic), keys.
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
const pkg = resolve(process.argv[2] || 'package');
const { COMPUTER_TOOL } = await import(pathToFileURL(join(pkg, 'src/computer.js')));
const run = (input) => COMPUTER_TOOL.run(input, { env: process.env });
const results = {};
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
