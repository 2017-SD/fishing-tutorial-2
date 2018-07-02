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
        def img_path = "/Desktop/directed_study/code/building/grails/fish/src/main/webapp/images/uploaded"

        // if image was passed else make it null (queue sends null parameter as string)
        if (imageUpload != null && imageUpload != "null") {
                                                            // CHANGE TO STORE INSIDE APP LATER
            def destDir = System.getProperty("user.home") + img_path

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

    // updates the catch in the database
    def editCatch() {

        def imagePath
        def dateCaughtModified = new Date().parse("yyyy-MM-dd", params.dateCaught)

        Catch getCatch = Catch.get(params.ID)   // get the catch

        // if there is no image for the current catch
        if (getCatch.image != null) {
            imagePath = getCatch.image
        } else {
            imagePath = String.format("%s.jpg", UUID.randomUUID().toString())
        }


        // replace image
        def imageUpload = params.image
        def img_path = "Desktop/directed_study/code/building/grails/fish/src/main/webapp/images/uploaded"

        if (imageUpload != null) {
            def destDir = System.getProperty("user.home") + img_path
            File destFile = new File(destDir, imagePath)
            destFile.createNewFile()
            imageUpload.transferTo(destFile)
            getCatch.image = imagePath
        }

        // replace everything else
        getCatch.tripName = params.tripName
        getCatch.fishType = params.fishType
        getCatch.dateCaught = dateCaughtModified
        getCatch.xCoord = Float.parseFloat(params.xCoord)
        getCatch.yCoord = Float.parseFloat(params.yCoord)
        getCatch.comment = params.comment


        getCatch.save(flush: true, failOnError: true)
        render "OH YES OH YES"
    }
}
