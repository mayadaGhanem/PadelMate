

const User= require('../models/users');
const express= require('express');
const router= express.Router();




//  const getAllUsers = await User.find({}).exec();
router.get(
    "/",async (req, res) => {
        try {
      
     const users=   await User.find({}).exec();
     console.log(users,'users')
     res.status(200).send(users)
    }

catch(e){
    console.log(e)
}
    }
  );

  router.post(
    "/signup",async (req, res) => {
        try {
            const user = new User({
                user_name: req.body.user_name,
                email: req.body.email,
              });
              const newUser = await user.save();
    
     res.status(200).send({newUser})
    }

catch(e){
    console.log(e)
}
    }
  );
  module.exports = router ;
