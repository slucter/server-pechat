#   Plan

    - Create DB
    - struktur DB {
        users: {
            id, fullname, username, email, password, img, phone, longlat, createdAt, updatedAt
        }
        message: {
            id, idSender, idReceiver, type, text, img, createdAt, updatedAt
        }
    }

    - End Point : {
        Show user by id / email,
        Update User : {
            fullname, username, email, img, , phone, longlat.
        }
        Show Message by idSender & toReceiver,
        Show Message grup
    }