# Model-driven Power Apps testing using Playwright - #PowerPlatformIreland December 2022

A test project for a model-driven Power App using Playwright. Includes 4 tests:

1. Correct app loads
2. Correct sitemap options available
3. Correct contact form commands visible
4. Create a new contact

## Executing the tests

1. Create the following environment variables on your machine/build server.

    | Environment variable key | Environment variable value |
    | ---------- | ---------- |
    | `APP_URL` | The URL to the model-driven Power App that is being tested. Make sure this includes the `appId` parameter. |
    | `USER_EMAIL` | The email of the user that will be performing the tests. This user should have multi-factor authentication disabled on their account. |
    | `USER_PASSWORD` | The password of the test user above. |

2. Install dependencies including Playwright browsers.

    ```cmd
    npm run setup
    ```

3. Run the tests.

    ```cmd
    npm run test
    ```
