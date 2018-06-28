package fish


import grails.converters.JSON


class CatchController {
    def springSecurityService

    def index() { }

    def getCatches() {
        User user = springSecurityService.currentUser
        render Catch.findAllByUser(user).toArray() as JSON
    }

    // returns full domain of a catch as JSON
    def getCatch() {
        render Catch.findAllById(params.catchID).toArray() as JSON
    }



    //TODO: Data verification check
    // Takes form parameters and saves it to the database
    def newCatch() {

        User user = springSecurityService.currentUser   // get current user

        def tripName = params.tripName
        def fishType = params.fishType
        def dateCaught = params.dateCaught
        def xCoord = params.xCoord
        def yCoord = params.yCoord
        def comment = params.comment
        def image = params.image

        def dateCaughtModified = new Date().parse("yyyy-MM-dd", dateCaught)

        def destFilename
        def imageUpload = image

        // if image was passed else make it null (queue sends null parameter as string)
        if (imageUpload != null && imageUpload != "null") {
            def destDir = System.getProperty("user.home") + "/Desktop/fish_img/"

            def id = UUID.randomUUID().toString()
            while (Catch.countByImage(id) > 0) {  // if this photo name already exist make a new one
                id = UUID.randomUUID().toString()
            }


            destFilename = String.format("%s.jpg", id)
            File destFile = new File(destDir, destFilename)

            destFile.createNewFile()
            imageUpload.transferTo(destFile)

        }
        else {
            destFilename = null
        }

        def fishCatch = new Catch(
                user: user,
                tripName: tripName,
                fishType: fishType,
                dateCaught: dateCaughtModified,
                xCoord: xCoord,
                yCoord: yCoord,
                comment: comment,
                image: destFilename,
        )

        fishCatch.save(flush: true, failOnError: true)
        render "OH YES OH YES"
    }
}
