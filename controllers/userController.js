const asyncHandler = require("../middlewares/asyncHandler");
const DBconnection = require("../db-connection/connect-mysql");
/**
 *@desc Create campain handler
 *@route POST /api/v1/users
 *@access private
 *@param
 */
exports.register = asyncHandler(async (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.json({
      success: false,
      statusCode: 400,
      message: "You must provide valid name,email and password!",
    });
  }
  // chick Email unickness:
  DBconnection.query(
    `select * from users where email = '${req.body.email}' `,
    (err, result) => {
      if (err) {
        return res.json({
          success: false,
          statusCode: 400,
          message: err,
        });
      }

      if (result.length) {
        console.log("found user: ", result[0]);
        return res.json({
          success: false,
          statusCode: 400,
          message: "Email is used , Try another Email!",
        });
      } // email not used: insert new user
      else {
          DBconnection.query(
          "insert into users (username, email,password) VALUES (?, ?,?)",
          [req.body.name, req.body.email, req.body.password],
          (err, result) => {
            if (err) {
              return res.json({
                success: false,
                statusCode: 400,
                message: err,
              });
            }

            if (result.affectedRows) {
              return res.json({
                success: true,
                statusCode: 201,
                message: "User registerd successfully.",
              });
            } else {
              return res.json({
                success: false,
                statusCode: 400,
                message: "User registerd failed.",
              });
            }
          }
        );
      }
    }
  );
});

/**
 *@desc Create campain handler
 *@route POST /api/v1/login
 *@access private
 *@param
 */
exports.login = asyncHandler(async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.json({
      success: false,
      statusCode: 400,
      message: "You must provide valid email and password!",
    });
  }
  //
  DBconnection.query(
    `select * from users where email = '${req.body.email}' and password= '${req.body.password}' `,
    (err, result) => {
      if (err) {
        return res.json({
          success: false,
          statusCode: 400,
          message: err,
        });
      }

      if (result.length) {
        return res.json({
          success: true,
          statusCode: 200,
          data: result[0],
        });
     }
     else
      {
        return res.json({
            success: false,
            statusCode: 400,
            message: 'Login failed,wrong credintials!',
          });
      }

      }); // email not used: insert new user
});
