# demo-app

## clamp(x, min, max)

Ограничивает число диапазоном `[min, max]`: возвращает `x`, если он внутри диапазона, иначе ближайшую границу. Определена в `src/clamp.js`.

```js
import { clamp } from './src/clamp.js';

clamp(7, 0, 10);  // 7
clamp(15, 0, 10); // 10
clamp(-5, 0, 10); // 0
```
