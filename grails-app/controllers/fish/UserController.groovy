package fish

class UserController {
    def springSecurityService

<<<<<<< HEAD
=======
    def index() { }

>>>>>>> attempt_2
    // this function checks if the user is logged in
    def getLogin() {
        User user = springSecurityService.currentUser

        if (user != null) {
            render user.fname
<<<<<<< HEAD
        } else {
=======
        }

        else {
>>>>>>> attempt_2
            render false
        }

    }
<<<<<<< HEAD
}
=======
}
>>>>>>> attempt_2
