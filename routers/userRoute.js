const express= require('express');
const router = express.Router();


const UserController= require('../controllers/userController');

router.route('/login')
      .post(UserController.login);

router.route('/register')
      .post(UserController.register); 
     
module.exports=router;     

