---
sidebar_position: 5
---

# Testing 
## Test types used by the team
There are hundreds of test types or description of test using in the industry, and sometimes a description of a test type means something different to different teams. Because of this it seamed important to list the test terms chosen as important, and define what they mean, why they are created, and all the ways in which they are run.
There are the test type terms that:
1. **Unit tests**
These test are easy for developers to create, run and develop against. It is recommended that these tests are run automatically in the CI pipeline when a pull request is created. Unit tests should form the bulk of the automated tests. 
1. **Narrow-integration tests**
A test which tests a single aspect of the code that interfaces with another system in some way. I.e. the interfacing between two systems is tested. It is recommended that these tests are run automatically in the CI pipeline when a pull request is created. When testing interfaces, it is preferred to build narrow integration test instead of unit tests with large scale mocking.
1. **Functional tests** also called integration or end-to-end tests
These are end-to-end tests that tests that call functions and validate the outcomes of the system. It is recommended that these test are committed alongside the code that performs the functions being tested.
   - API base functional test are built using TTK, Jest and Postman tests.
   - UI Functional test are built using TestCafe.
There are three way's in which functional test are run. 
   1. Manually run by an engineer against a chosen environment. (Developers can use this method to add to the test set, and to debug the code in a TTD style.)
   1. Automatically run inside a CI pipeline
   1. As a test to validate the deployment  I.e. deployment test   
1. **Deployment tests**
Deployment test are tests that are designed to validate a deployment. It is recommended that these test are packaged as helm tests and then configured to run through an IaC deployment pipeline.
1. **Golden Path tests**
This is the test set that validate a product. Normally this comprises of a collection of all functional product component functional tests, and may have additional test collections on top of that. It is recommended that functional test are packaged as helm tests and configured to run through the IaC deployment pipeline. 

## CI automated tests 
These should include:
1. Unit Tests
1. Narrow Integration Tests (which may be the same as the Unit Tests)
1. (optional) Functional Tests. 
That means that Functional Tests should only be executed in the CICD if it is possible to build the full-stack in the CICD to run against. If this is not feasible, the functional test should be run manually by the developer against an environment, and should be committed with the repository code.
## Deployment functional Tests
The Functional Tests should be executed by the IaC environment via Helm, and it can also be automated by IaC Github listening to new releases (i.e. helm charts). Keep in mind that it MUST still be possible for a developer to run the tests locally against a full-stack environment (remotely such as product dev, or locally if they have the available resources, etc).


## Recommended Packages/Tools

The best package to use for testing often depends on the type and scope of a project
versus one size fits all. For that reason we'll mention two of the test frameworks
that the team has had success with.

## TTK - Self testing toolkit
This is the preferred tool for API based testing / mocking for testing, and asserting across multiple sequential asynchronous calls.
The Mojaloop Community maintains a collection of test suites for the TTK.
(https://github.com/mojaloop/testing-toolkit-test-cases)[https://github.com/mojaloop/testing-toolkit-test-cases] 

## Testcafe - <https://testcafe.io/>
Preferred tool for UI based testing. Recommend using the page object model pattern.

## Jest - <https://jestjs.io>

[jest][] is a popular testing framework from Facebook. It excels at testing React and other
component-based web applications, and can be used in other contexts. It is considered an
_opinionated_ framework, as it provides its own set of assertions, spies/stubs/mocks, and
other features (such as snapshot testing and code coverage) out-of-the-box.

Jest is owned by Facebook.


#### Assertion Library


#### Stubs, Spies and Mocks


#### Code Coverage

- [nyc][]: the most popular code-coverage tool; the successor CLI for Istanbul

For more on Code Coverage, see the [Code Coverage](./code-coverage) section

[`assert` module]: https://nodejs.org/api/assert.html#assert_assert
[babel]: https://babeljs.io
[chai]: https://www.npmjs.com/package/chai
[examples repository]: https://github.com/mochajs/mocha-examples
[jest]: https://www.npmjs.com/package/jest
[karma]: https://www.npmjs.com/package/karma
[mocha documentation]: https://mochajs.org
[mocha]: https://www.npmjs.com/package/mocha
[nyc]: https://www.npmjs.com/package/nyc
[openjs foundation]: https://openjsf.org
[protractor]: https://www.npmjs.com/package/protractor
[sinon]: https://www.npmjs.com/package/sinon
[testdouble]: https://www.npmjs.com/package/testdouble
[unexpected]: https://www.npmjs.com/package/unexpected
[webdriverio]: https://www.npmjs.org/package/webdriverio
[snapshots]: https://jestjs.io/docs/snapshot-testing
