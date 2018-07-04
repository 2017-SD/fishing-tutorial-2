package fish

<<<<<<< HEAD
import grails.compiler.GrailsCompileStatic
import grails.plugin.springsecurity.annotation.Secured
import grails.rest.Resource

@GrailsCompileStatic
@Secured(['permitAll'])
@Resource(uri = '/api/catch')
=======
>>>>>>> attempt_2
class Catch {
    String tripName
    String fishType
    String comment
    Float xCoord
    Float yCoord
    Date dateCaught
    String image

<<<<<<< HEAD
    static belongsTo = [fisher: Fisher]
=======
    static belongsTo = [user: User]
>>>>>>> attempt_2

    static constraints = {
        tripName blank: false
        fishType blank: false
        comment nullable: true
        xCoord nullable: true
        yCoord nullable: true
        dateCaught blank: false
        image nullable: true
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> attempt_2
