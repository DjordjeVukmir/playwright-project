#playwright-project


How to install/setup the project:

Run the following in terminal and follow the installation procedure:

-Create a new folder locally for the project.

-Open the prevously created folder in VSCode, run following command in terminal:

--git clone https://github.com/DjordjeVukmir/playwright-project.git .

After the repository has been cloned, run 'npm install'


playwright-project/
├── tests/
│   └── avia-sales.spec.js      # Main test file for Aviasales
├── playwright.config.js        # Playwright configuration
├── package.json
└── README.md

Test case execution

Use 'npx test playwright' to run all test cases

Use 'npx test playwright --headed' to run them in headed mode using all supported browsers

Use 'npx test playwright --headed --project=chromium' to run them in headed mode using chromium based browsers

Use 'npx test playwright --headed --project=chromium --workers=1' to run them in headed mode using chromium based browsers with a single worker

Use 'npx playwright test tests/avia-sales.spec.js' to run a specific test file

Use 'npx playwright test tests/avia-sales.spec.js --debug' to run them in debug mode

Use 'npx playwright codegen' to run the code generator tool

Allure reports setup

Run the following commands:

npm install -D allure-playwright

npm install -D allure-playwright allure-commandline

Add '['allure-playwright'] to the config file, reporter.

Once the tests are executed, allure-results folder will appear in the project structure.

NOTE!! REQUIRES JAVA 8+:

--Find your Java installation path

--Open Environment Variables settings

--Edit the system environment variables.

--Click Environment Variables button.

--Add JAVA_HOME

--Under System variables, click New...

--Set:

---Variable name: JAVA_HOME

---Variable value: your JDK install path (e.g. C:\Program Files\Java\jdk-17.0.2)

---Update PATH variable

---In System variables, find Path, select it, and click Edit...

---Click New and add: %JAVA_HOME%\bin

--Save and exit all dialogs



Run the following commands afterwards:
1. npm run allure-generate
2. npm run allure-open


Docker:

Pull the prebuilt Docker image:
--docker pull djordjevukmir/my-playwright-tests:latest-working

Run the container to execute tests and serve the Allure report:
--docker run --rm -p 8080:8080 yourusername/my-playwright-tests:latest-working

Open the test report:
In your browser, navigate to:
http://localhost:8080