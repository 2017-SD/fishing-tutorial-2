package fish

class BootStrap {

    def init = { servletContext ->

        def today = new Date()

        // Add for creating Roles and Users
        def adminRole = new Role(authority: 'ROLE_ADMIN').save(flush: true)
        def userRole = new Role(authority: 'ROLE_USER').save(flush: true)


        // Create the admin account and save it
        def testAdmin = new User(username: 'b', password: 'p', fname: 'b', lname: 'w').save(flush: true)

        // Create fisher account and save it
        def testFisher = new Fisher(username: 'br', password: 'pa', fname: 'br', lname: 'wi').save(flush: true)


        UserRole.create(testAdmin, adminRole, true)
        UserRole.create(testFisher, userRole, true)

        UserRole.withSession {
            it.flush()
            it.clear()
        }


        // Create some fish and save them
        def first_fish = new Catch(tripName: "Up State", fishType: "Walleye", comment: "It was cold", dateCaught: today, xCoord: 47.1211, yCoord: 88.5694, image: "IwillBreakEverything", user: testAdmin)
        def second_fish = new Catch(tripName: "Down State", fishType: "Catfish", comment: "It was warm", dateCaught: today, xCoord: 22.1333, yCoord: 11.4141, image: "img", user: testFisher)

        first_fish.save(flush:true)
        second_fish.save(flush:true)
    }

    def destroy = {
    }
}
