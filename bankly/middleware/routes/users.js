/** User related routes. */

const User = require('../models/user');
const express = require('express');
const router = new express.Router();
const ExpressError = require('../helpers/expressError');
const { authUser, requireLogin, requireAdmin } = require('../middleware/auth');

/** GET /
 *
 * Get list of users. Only logged-in users should be able to use this.
 *
 * It should return only *basic* info:
 *    {users: [{username, first_name, last_name}, ...]}
 *
 */

router.get('/', authUser, requireLogin, async function(req, res, next) {
  try {
    let users = await User.getAll();
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
}); // end

/** GET /[username]
 *
 * Get details on a user. Only logged-in users should be able to use this.
 *
 * It should return:
 *     {user: {username, first_name, last_name, phone, email}}
 *
 * If user cannot be found, return a 404 err.
 *
 */

router.get('/:username', authUser, requireLogin, async function(
  req,
  res,
  next
) {
  try {
    let user = await User.get(req.params.username);
      return res.json({ user });
    
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[username]
 *
 * Update user. Only the user themselves or any admin user.
 *
 * It should accept: #need test
 *  {first_name, last_name, phone, email}
 *
 * It should return: 
 *  {user: all-data-about-user}
 * {
      username: 'u1',
      first_name: 'new-fn1',
      last_name: 'ln1',
      email: 'email1',
      phone: 'phone1',
      password: '$2b$04$CFDqobZC21jsGgXlJ6L1ReiwYdoVxWgmiRv4NpR5tYQzmkfJHHuUu',
      admin: false
    }


 * It user cannot be found, return a 404 err.    
 * If they try to change other fields (including non-existent ones), an error should be raised.
 *
 */

    // FIXES BUG #4 remove requireLogin & requireAdmin
router.patch('/:username', authUser, async function(
  req,
  res,
  next
) {
  try {
    if (!req.curr_admin && req.curr_username !== req.params.username) {
      throw new ExpressError('Only  that user or admin can edit a user.', 401);
    }

// FIXES BUG #4
    if (req.body.admin || req.body.password) {
      throw new ExpressError('This field do not allow to be patched', 401);
    }

    
    // get fields to change; remove token so we don't try to change it
    let fields = { ...req.body };
    delete fields._token;

    let user = await User.update(req.params.username, fields);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
}); // end

/** DELETE /[username]
 *
 * Delete a user. Only an admin user should be able to use this.
 *
 * It should return:
 *   {message: "deleted"}
 *
 * If user cannot be found, return a 404 err.
 */

router.delete('/:username', authUser, requireAdmin, async function(
  req,
  res,
  next
) {
  try {
    // FIXES BUG #5
    await User.delete(req.params.username);
    return res.json({ message: 'deleted' });
  } catch (err) {
    return next(err);
  }
}); // end

module.exports = router;
