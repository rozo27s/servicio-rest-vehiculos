const config = {
    application: {
        cors: {
            server: [
                {
                    origin: "142.93.66.44:3000", //servidor que deseas que consuma o (*) en caso que sea acceso libre
                    credentials: true
                }
            ]
        }
    }
}

module.exports = config;