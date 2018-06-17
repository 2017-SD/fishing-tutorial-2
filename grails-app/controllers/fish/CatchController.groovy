package fish

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured

class CatchController {

    def springSecurityService

    def index() { }

    @Secured(['ROLE_USER'])
    def getCatches() {
        println 'TEST'

        User user = springSecurityService.currentUser

        render Catch.findAllByUser(user).toArray() as JSON
        render Catch.list().toArray() as JSON
    }
}
