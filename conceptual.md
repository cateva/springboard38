### Conceptual Exercise

Answer the following questions below:

- What is a JWT?
JSON Web Tokens: JWTs can store any arbitrary “payload” of info, which are “signed” using a secret key, so they can be validated later (similar to Flask’s session).

- What is the signature portion of the JWT?  What does it do?
Signature: version of header & payload, signed with secret key
Uses algorithm specified in header (we’ll use default, “HMAC-SHA256”)


- If a JWT is intercepted, can the attacker see what's inside the payload?
Yes, JWT payload is encoded not encrypted 



- How can you implement authentication with a JWT?  Describe how it works at a high level.

Make request with username/password to AJAX login route
Server authenticates & returns token in JSON
Token is encoded & signed with open standard, “JSON Web Token”
Front-end JavaScript receives token & stores (in var or localStorage)
For every future request, browser sends token in request
Server gets token from request & validates token



- Compare and contrast unit, integration and end-to-end tests.

Unit Tests: Unit tests are the easiest tests to write because you can expect specific results for your input. There are no dependencies or complex interactions.

Integration Tests: Integration tests are more complex than unit tests because you have to deal with dependencies.

End-To-End: End-to-end tests simulate a specific user interaction flow with your app. For example, clicking or entering text.

Unit tests are the least complex and E2E tests are the most complicated. We tend to write more tests with less complexity. It’s preferable to write more unit tests than E2E tests. The integration tests fit in the middle. This implies that we write them more frequently than the E2E tests but less than unit tests.


- What is a mock? What are some things you would mock?
Mocking is primarily used in unit testing
An object under test may have dependencies on other (complex) objects
To isolate the behavior, you replace other objects by mocks that simulate their behavior
This is useful if the real objects are impractical to incorporate into the unit test.


- What is continuous integration?
Continuous Integration is the practice of merging in small code changes frequently, rather than merging in a large change at the end of a development cycle.

The goal is to build better software by developing and testing in smaller increments.


- What is an environment variable and what are they used for?
An environment variable is a dynamic "object" on a computer, containing an editable value, which may be used by one or more software programs in Windows. Environment variables help programs know what directory to install files in, where to store temporary files, and where to find user profile settings.


- What is TDD? What are some benefits and drawbacks?
Test Driven Development

Benefits:
You only write code that’s needed
More modular design
Easier to maintain 
Easier to refactor 
High test coverage
Tests document the code
Less debugging 


Drawbacks:
No silver bullet
slow process 
All the members of a team got to do it 
Tests got to be maintained when requirements change

- What is the value of using JSONSchema for validation?
The primary strength of JSON Schema is that it generates clear, human- and machine-readable documentation. It's easy to accurately describe the structure of data in a way that developers can use for automated validation. This makes work easier for developers and testers, but the benefits go beyond productivity.


- What are some ways to decide which code to test?



- What does `RETURNING` do in SQL? When would you use it?
The returning clause specifies the values return from DELETE , EXECUTE IMMEDIATE , INSERT , and UPDATE statements. You can retrieve the column values into individual variables or into collections. You cannot use the RETURNING clause for remote or parallel deletes.


- What are some differences between Web Sockets and HTTP?
WebSocket is an event-driven protocol, which means you can actually use it for truly realtime communication. Unlike HTTP, where you have to constantly request updates, with websockets, updates are sent immediately when they are available.


- Did you prefer using Flask over Express? Why or why not (there is no right
  answer here --- we want to see how you think about technology)?
Flask 
Because i just finished capstone 1 