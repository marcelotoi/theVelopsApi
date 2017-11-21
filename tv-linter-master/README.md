# theVelops linter

## How to use
1. Copy this file into the root of your project
2. Add these scripts into the `package.json` file of your project
    ```json
    "scripts": {
      "test": "eslint . && jest tests/",
      "lint": "eslint .",
      "lint:fix": "eslint . --fix"
    }
    ```
