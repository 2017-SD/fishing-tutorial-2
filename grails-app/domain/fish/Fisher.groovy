package fish

import grails.compiler.GrailsCompileStatic
import grails.plugin.springsecurity.annotation.Secured
import grails.rest.Resource

// made for REST
@GrailsCompileStatic
@Secured(['ROLE_USER'])
@Resource(uri = '/api/fisher')
class Fisher extends User {


    String fname
    String lname

    static constraints = {
    }
}
