import winston from "winston";

//! logger général
const logger= winston.createLogger({
    level : "info",
    format: winston.format.combine(
         winston.format.colorize(), 
        winston.format.timestamp(),
        winston.format.printf(
            ({level , message , timestamp})=> `${timestamp} [${level.toUpperCase()}]: ${message}`
        )
    ),
    transports:[
        new winston.transports.Console(), //? log sur la console
        new winston.transports.File({filename:"../logs/error.log" , level: "error"}), //? erreurs dans un fichier
        new winston.transports.File({ filename: "../logs/combined.log" }) //? tous les logs
    ]
})

export default logger;