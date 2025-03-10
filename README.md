# Pizza App

## Project structure

```
    dist/                                           The folder containing the result of the 'make --prod' command (aka the folder you can upload on a server)
    node_modules/                                   Provides npm packages to the entire project
    public/                                         The folder containing the result of the 'make' command (development build)
    src/                                            The folder you'll write code into
        global/                                     Use this folder to add global styles or scripts
            scss/                                   Global styles
            ts/                                     Global scripts
            wwwroot/                                Other global files (These files (or folders) will be copied to the root of the 'public/' folder)
        routes/                                     In this folder you'll find all the routes you created
            <route-name>/
                <route-name>.route.hbs              The route's HTML template
                <route-name>.route.scss             The route styles
                <route-name>.route.ts               The route's code
                build-data.js                       Custom data passed to the template compiler
        components/                                 In this folder you'll find all the components you created
            <component-name>/
                <component-name>.component.hbs      The component's HTML template
                <component-name>.component.scss     The component's styles
                <component-name>.component.ts       The component's code
    .eslintrc.json                                  ESLint configuration
    .gitignore                                      Specifies intentionally untracked files that Git should ignore
    package.json                                    Configures npm package dependencies that are required for this project
    package-lock.json                               Provides version information for all packages installed into node_modules by the npm client
    pizza.json                                      Configures this project
    README.md                                       The file you're reading
    tsconfig.json                                   TypeScript configuration
    webpack.config.ts                               webpack configuration
```

## Configure

You can configure the project modifying these files:
 - `pizza.json` The main configuration file
 - `.eslintrc.json` ESLint configuration
 - `tsconfig.json` TypeScript configuration
 - `webpack.config.ts` webpack configuration

In the `pizza.json` file you can configure things like the bundler, the linter, the server and the hosting provider.

**Note:**\
Currently the `pizza.json` file options, except for the local server one, have only one option to choose from.

### PWA

#### Add assets to the cache

To add assets to the Service Worker cache edit the `pizza.json` file like in this example:

```json
{
    "options": {
        "serviceWorker": {
            "assets": {
                "static": [
                    "/offline.html"
                ],
                "patterns": [
                    "/assets/js/*.css",
                    "/assets/js/*.js"
                ]
            }
        }
    }
}
```

#### Register the Service Worker
Add the following code at the top of every `<route-name>.route.ts` file.

```typescript
import * as pizza from "@alex-sandri/pizza-utilities";

pizza.ServiceWorker.register();
```

#### Show install button

```typescript
let deferredPrompt?: any;

const installPwaButton = <HTMLButtonElement>document.querySelector("#install-pwa");

pizza.ServiceWorker.listen("beforeinstallprompt", e =>
{
    deferredPrompt = e;

    installPwaButton.style.display = "block";
});

installPwaButton.addEventListener("click", () =>
{
	deferredPrompt?.prompt();

	deferredPrompt?.userChoice.then((choiceResult: any) =>
	{
        if (choiceResult.outcome === "accepted")
            installPwaButton.style.display = "none";

		deferredPrompt = null;
	});
});
```

#### Listen for app updates

```typescript
pizza.ServiceWorker.listen("updateready", () =>
{
    // TODO: Show a message to the user

    // After the user accepts the update
    pizza.ServiceWorker.update();
});
```

## Build data

You can pass an object to the template compiler to add dynamic data in a page

### Usage

1. Create a file called `build-data.js` inside a route folder (e.g.: `src/routes/index/build-data.js`)
2. Export an object with your data: `module.exports = { ... };`
3. Access your data within a template using: `{{ data.<property-name> }}`

### Example:

```javascript
// build-data.js

const path = require("path");

module.exports = {
    fileName: path.basename(__filename),
};
```

```html
<!-- fileName.component.hbs -->

<p>File name: {{ data.fileName }}</p>
```
