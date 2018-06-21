package fish


import grails.converters.JSON


class CatchController {
    def springSecurityService

    def index() { }

    def getCatches() {
        User user = springSecurityService.currentUser
        render Catch.findAllByUser(user).toArray() as JSON
    }
}
