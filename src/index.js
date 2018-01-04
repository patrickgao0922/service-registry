import express from "express"
import ServiceRegistry from "./service-registry"

let serviceRegistry = new ServiceRegistry()
let app = express()

app.put("/announce/:service/:port", (req, res, next) => {
	let service = req.params.service
	let port = req.params.port
	let ip = req.connection.remoteAddress.includes("::")? `[${req.connection.remoteAddress}]`:req.connection.remoteAddress
	serviceRegistry.add(service,ip,port)
	res.json({result: `${service} at ${ip}:${port}`})
})

app.listen(8080,()=>{
	console.log("Listening: 8080")
})