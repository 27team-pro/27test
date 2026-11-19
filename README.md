# demo-app

Небольшое демо-приложение на Node.js (ES-модули): утилиты в `src/` и работа с SQLite через `better-sqlite3`.

## src/clamp.js

### `clamp(x, min, max)`

Ограничивает число `x` диапазоном `[min, max]`: возвращает `x`, если оно внутри диапазона, иначе ближайшую границу.

```js
import { clamp } from './src/clamp.js';

clamp(5, 0, 10);   // 5
clamp(-3, 0, 10);  // 0
clamp(42, 0, 10);  // 10
```
