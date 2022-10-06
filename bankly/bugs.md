There are six bugs. You should turn in:

1) A short description of the bug

2) A test that catches that case (put in a comment, eg // TESTS BUG #1, so we can find it) You could write a test that fails, proving a bug exists. 

- A fix for the code (put in a comment, eg // FIXES BUG #1, so we can find it)



BUG #1: 
File location: routes - auth.js - '/login'

Issue: do not raise 401 status code for not authenticated user

Solution: Added await before User.authenticate(username, password), otherwise will receive promise, which will still pass next logic: if (user)



BUG #2: 
File location: routes - users.js - GET  '/'

Issue: 
It should return only *basic* info: 
{users: [{username, first_name last_name}, ...]}, but instead, the return information includes the whole list:
{users: [{username, first_name last_name, email, phone}, ...]}

Solution: 
1) Added to the models - users.js - getAll():
remove email & phone from SELECT query. 
2) modify test:
 expect(response.body.users[0]).toEqual({
      username: 'u1',
      first_name: 'fn1',
      last_name: 'ln1',});

BUG #3: 
File location: routes - users.js - router.get('/:username')

Issue: If user cannot be found, return a 404 err.

Solution:
1) added in the test: 
test 404 error when a user cannot be found. 

2) change the models - users.js - get(username):
    if (user) {
      return user;
    }
    *throw* new ExpressError('No such user', 404);
    

BUG #4:
File location: routes - users.js - router.PATCH /[username] 

ISSUE: 
Cannot patch data if logged in as user themselves

SOLUTION: 
1) removed requireLogin, requireAdmin from the pass in functions 
2) added logic to avoid failing test for "should disallowing patching not-allowed-fields": 

if (req.body.admin || req.body.password) {
      throw new ExpressError('This field do not allow to be patched', 401);
    }

BUG #5:
File location: routes - users.js - router.DELETE /[username]

ISSUE: 
Added test for: if user cannot be found, return a 404 err.
The test cannot pass with the original code.


SOLUTION: 
1) Add 'await' before User.delete(req.params.username);

2) changed ' to ` in models - user.js - delete(username) SQL call 



BUG #6: 
File location: middleware - auth.js - authUser(); 

ISSUE: 
should not raise error when there is no token; 

SOLUTION: 
