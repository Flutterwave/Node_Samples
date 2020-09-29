import userService from '../services/user.services';

class UserController {

  static async LoginUser(req, res) {
    try {
      const getCustomers =   await userService.LoginUser(req.body)
      //You can use JWT here and Bcrypt
      // This is just for demo purpose
      if (req.body.password !== "password1" || getCustomers.length <= 0 ) {
        return res.status(400).json({
          status: 400,
          error: "Not verified",
        });
      }else{
        console.log(getCustomers)
        return res.status(200).json({
          status: 200,
          data: {
            id: getCustomers[0].id,
            username: getCustomers[0].username,
            fullname: getCustomers[0].fullname,
            walletamount: getCustomers[0].walletamount,
            email: getCustomers[0].email
          }
        });
      }

    } catch (error) {
      console.log(error)
      return res.status(400).json({
        status: 400,
        error: "Not verified",
      });
    }
  }

  
}
export default UserController;