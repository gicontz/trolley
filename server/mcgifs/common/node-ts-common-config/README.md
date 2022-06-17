# Node TS Common Config

Common configuration files for developing in Node.js using TypeScript.

## Installation

- Install dependencies:
  - `yarn add reflect-metadata`
- Install devDependencies:
  - `yarn add --dev eslint eslint-config-airbnb-base eslint-plugin-filenames eslint-plugin-import`
  - `yarn add --dev prettier eslint-config-prettier eslint-plugin-prettier`
  - `yarn add --dev @typescript-eslint/eslint-plugin @typescript-eslint/parser`
  - `yarn add --dev typescript`
  - `yarn add --dev nodemon ts-node`
  - `yarn add --dev @types/node`
- Fix dependency warnings and errors if necessary.
- Add this project into your own project, using any method you prefer.
  - Examples: `node package`, `git submodule`, `git subtree`, etc.

## Usage

- `ESLint` and `Prettier` configuration files need to be in `JavaScript` to enable importing.
- JSON parsing is required to prevent problems with the ESLint extension for VSCode.
- For the examples below, replace `<library-path>` with the actual path to this library.
  - Example for a project that includes this as a `node package`:
    - Replace `<library-path>` with `./node_modules/@d-lapinig/node-ts-common-config`

### `eslint`

- Create a `.eslintrc.js` file in the root of your project with the following contents:

  ```JavaScript
  const fs = require('fs');

  const config = JSON.parse(fs.readFileSync('<library-path>/.eslintrc.json'));
  // Add custom configuration here
  // Example:
  // config.rules['sample-rule-name'] = 'sample-rule-value';

  module.exports = config;
  ```

### `prettier`

- Create a `.prettierrc.js` file in the root of your project with the following contents:

  ```JavaScript
  const fs = require('fs');

  const config = JSON.parse(fs.readFileSync('<library-path>/.prettierrc.json'));
  // Add custom configuration here
  // Example:
  // config['sample-rule-name'] = 'sample-rule-value';

  module.exports = config;
  ```

### `typescript`

- Create a `tsconfig.json` file in the root of your project with the following contents:

  ```JSON
  {
    "extends": "<library-path>/tsconfig.json",
    "compilerOptions": {
      "outDir": "build",
      "rootDir": "<root-directory>"
    }
  }
  ```

  - You can also customize the `tsconfig.json` file as normal.
    - If editing the `types` property, make sure to include `node`.
