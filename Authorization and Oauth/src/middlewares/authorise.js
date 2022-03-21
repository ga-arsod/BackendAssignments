// permittedRoles = ["seller", "admin"]

const authorise = (permittedRoles) => {
     
    return (req,res,next) => {
        // getting the user;
        const user = req.user;
        let isPermitted = false;

        // console.log({req});

        // checking if he has permitted role
        permittedRoles.map(role => {
            if(user.role.includes(role)){
                isPermitted = true;
            }
        })

        // if permitted, he can go ahead
          if(isPermitted){
              return next()
          }
          else{
              return res.status(401).send({message : "You are not allowed to perform this action"});
          }
      }

}


module.exports = authorise