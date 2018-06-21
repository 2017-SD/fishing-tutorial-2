package fish

class Catch {
    String tripName
    String fishType
    String comment
    Float xCoord
    Float yCoord
    Date dateCaught
    String image

    static belongsTo = [user: User]

    static constraints = {
        tripName blank: false
        fishType blank: false
        comment nullable: true
        xCoord nullable: true
        yCoord nullable: true
        dateCaught blank: false
        image nullable: true
    }
}
