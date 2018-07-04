package fish

class BootStrap {

    def init = { servletContext ->

        def today = new Date()

<<<<<<< HEAD
        // Create the admin account and save it
        def testAdmin = new User(username: 'b', password: 'p', fname: 'b', lname: 'w').save(flush: true)

        // Create fisher account and save it
        def testFisher = new Fisher(username: 'br', password: 'pa', fname: 'br', lname: 'wi').save(flush: true)


=======
>>>>>>> attempt_2
        // Add for creating Roles and Users
        def adminRole = new Role(authority: 'ROLE_ADMIN').save(flush: true)
        def userRole = new Role(authority: 'ROLE_USER').save(flush: true)

<<<<<<< HEAD

        UserRole.create(testAdmin, adminRole, true)
        UserRole.create(testFisher, userRole, true)

=======
        // Create the admin account and save it
        def testAdmin = new User(username: 'b', password: 'p', fname: 'bryce', lname: 'w')

        testAdmin.save(flush: true)


        /** GIVEN USER ROLE FOR TIME BEING */

        UserRole.create testAdmin, userRole, true
>>>>>>> attempt_2
        UserRole.withSession {
            it.flush()
            it.clear()
        }

<<<<<<< HEAD

        // Create some fish and save them
        def first_fish = new Catch(tripName: "Up State", fishType: "Walleye", comment: "It was cold", dateCaught: today, xCoord: 47.1211, yCoord: 88.5694, image: "IwillBreakEverything", fisher: testFisher)
        def second_fish = new Catch(tripName: "Down State", fishType: "Catfish", comment: "It was warm", dateCaught: today, xCoord: 22.1333, yCoord: 11.4141, image: "img", fisher: testFisher)

        first_fish.save(flush:true)
        second_fish.save(flush:true)
    }

=======
        // Create a catch and save it
        def fish = new Catch(tripName: "Up State", fishType: "Walleye", comment: "It was cold", dateCaught: today, xCoord: 47.1211, yCoord: 88.5694, image: "IwillBreakEverything", user: testAdmin)

        fish.save(flush:true)

    }


>>>>>>> attempt_2
    def destroy = {
    }
}
