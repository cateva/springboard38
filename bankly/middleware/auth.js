/** Middleware for handling req authorization for routes. */

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

/** Authorization Middleware: 
 * Requires user is logged in. */

function requireLogin(req, res, next) {
  try {
    if (req.curr_username) {
      return next();
    } else {
      return next({ status: 401, message: 'Unauthorized' });
    }
  } catch (err) {
    return next(err);
  }
}

/** Authorization Middleware: 
 * Requires user is logged in and is staff. */

function requireAdmin(req, res, next) {
  try {
    if (req.curr_admin) {
      return next();
    } else {
      return next({ status: 401, message: 'Unauthorized' });
    }
  } catch (err) {
    return next(err);
  }
}

/** Authentication Middleware: put user on request
 *
 * If there is a token, verify it, get payload (username/admin),
 * and store the username/admin on the request, so other middleware/routes
 * can use it.
 *
 * It's fine if there's no token---if not, don't set anything on the
 * request.
 *
 * If the token is invalid, an error will be raised.
 *
 **/

 //bug #6: should work when there is no token
function authUser(req, res, next) {
  try {
    const token = req.body._token || req.query._token;
    //console.log('req: ', req); 
    //console.log('req.body: ', req.body); 

    if (token) { //bug #6: added logic for when there is no token
      let payload = jwt.decode(token);
      //console.log('print payload in authUser: ', payload)
      //console.log('print token: ', token)
      req.curr_username = payload.username;
      req.curr_admin = payload.admin;
    }
    return next();
  } catch (err) {
    err.status = 401;
    return next(err);
  }
} // end



/** 
function authUser(req, res, next) {
  try {
    if (!req) {
      res = {}; 
     
    } else {
      const token = req.body._token
      console.log('token', token);
      //const token = req.body._token || req.query._token;
      let payload = jwt.decode(token);
      res.curr_username = payload.username;
      res.curr_admin = payload.admin;
    }
    return next();

  } catch (err) {
    err.status = 401;
    return next(err);
  }
}
*/

module.exports = {
  requireLogin,
  requireAdmin,
  authUser
};
