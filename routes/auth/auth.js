// ./routes/auth/auth.js

const { roles } = require('./roles')
const Servers = require('../../models/Servers');
 
exports.grantAccess = function(action, resource) {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.server.role)[action](resource);
      if (!permission.granted) return res.status(401).json({
        error: "You don't have permission to perform this action"
      });
      next();
    } catch(error) {
      next(error);
    }
  }
}
 
exports.allowIfLoggedIn = async (req, res, next) => {
  try {
    const server = await Servers.findById(res.locals.loggedInServerId);
    if (!server) return res.status(401).json({
      error: "You need to be logged in to access this route"
    });
    req.server = server;
    next();
  } catch (error) {
    next(error);
  } 
}