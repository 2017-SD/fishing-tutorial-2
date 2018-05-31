package fish

class BootStrap {

    def init = { servletContext ->

        def today = new Date()

        // Add for creating Roles and Users
        def adminRole = new Role(authority: 'ROLE_ADMIN').save(flush: true)
        def userRole = new Role(authority: 'ROLE_USER').save(flush: true)

        // Create the admin account and save it
        def testAdmin = new User(username: 'b', password: 'p', fname: 'b', lname: 'w')

        testAdmin.save(flush: true)

        UserRole.create testAdmin, adminRole, true
        UserRole.withSession {
            it.flush()
            it.clear()
        }

        // Create a fish and save it
        def fish = new Catch(tripName: "Up State", fishType: "Walleye", comment: "It was cold", dateCaught: today, xCoord: 47.1211, yCoord: 88.5694, image: "IwillBreakEverything", user: testAdmin)

        fish.save(flush:true)

    }

    def destroy = {
    }
}
