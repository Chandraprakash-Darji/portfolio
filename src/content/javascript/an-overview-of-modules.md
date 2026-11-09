## AN OVERVIEW OF MODULES


- 👉 Reusable piece of code that encapsulates implementation details;
- 👉 Usually a standalone file, but it doesn’t have to be.

### WHY MODULES?

- 👉 Compose software: Modules are small building blocks that we put together to build complex applications;
- 👉 Isolate components: Modules can be developed in isolation without thinking about the entire codebase;
- 👉 Abstract code: Implement low-level code in modules and import these abstractions into other modules;
- 👉 Organized code: Modules naturally lead to a more organized codebase;
- 👉 Reuse code: Modules allow us to easily reuse the same code, even across multiple projects.

### NATIVE JAVASCRIPT (ES6) MODULES

**ES6 MODULES** Modules stored in files, exactly one module per file.

||ES6 MODULE|SCRIPT|
|:---|:---:|:---:|
|👉 Top-level variables|Scoped to module |Global|
|👉 Default mode|Strict mode |“Sloppy” mode|
|👉 Top-level this|undefined| window|
|👉 Imports and exports|✅ YES| 🚫 NO|
|👉 HTML linking|`<script type="module">`| `<script>`|
|👉 File downloading|Asynchronous|Synchronous|

### HOW ES6 MODULES ARE IMPORTED

- 👉 Modules are imported synchronously
- 👉 Possible thanks to top-level (“static”) imports, which make imports known before execution
- 👉 This makes bundling and dead code elimination possible

```js
import {rand} from '.math.js' 
// rand is not copied from math.js it is Refrenced
import {showDice} from '.dom.js'
const dice = rand(1,6,2)
showDice(dice)
```

This is the process of How the module file is processed.

||⬇  Parsing index.js  ⬇||
|:---|:---:|:---:|
|Asynchronous downloading math.js  ⬇||⬇  Asynchronous downloading dom.js|
|Linking imports to math.js exports  ⬇||⬇  Linking imports to dom.js exports|
|Execution math.js  ⬇||⬇  Execution dom.js|
||Execution index.js||

### Import and Export Modules

1. Named Import/Export

    ```js
    export const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
    };
    ```

    Function is Exported as name `addToCart()`

    ```js
     import { addToCart } from './shopingCart.js'
    ```

    Importing Should have same name as export.

2. Import Everything

   ```js
    import * as ShoppingCart from './shopingCart.js';
   ```

    Everthing will be available to use now in your code.

    To use you need to use name space as module name

    ```js
    console.log(ShoppingCart.totalPrice, ShoppingCart.qt, ShoppingCart.cart);
    ```

3. Default Import/Export

    ```js
    export default '22332';
    ```

    Exporting the Module.

    ```js
    import num from './shopingCart.js';
    ```

    Importing as any name as you want.

4. Changing name while importing/Exporting

    ```js
    export { totalPrice, totalQuatity as qt };
    ```

    Changing while Exporting

    ```js
    import { tq, totalPrice as price } from './shopingCart.js';
    ```

    Changing while Importing

