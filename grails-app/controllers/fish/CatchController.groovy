package fish

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured


@Secured(['ROLE_USER'])
class CatchController {

    def springSecurityService

    def index() { }

    def getCatches() {
//        Fisher me = springSecurityService.currentUser
//        def catches = Catch.findAllByFisher(me).toArray()

        def catches = Catch.list().toArray()

        println catches

        render catches as JSON
    }
}
