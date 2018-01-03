class ServiceRegistry {
	constructor() {
		this._services = []
		this._timeout = 30
	}

	add(service,ip,port) {
		const key = service + ip + port

		if (!this._services[key]) {
			this._services[key] = {}
			this._services[key].timestamp= Math.floor(new Date()/1000)
			this._services[key].ip = ip
			this._services[key].port = port
			this._services[key].service = service
			console.log(`Added service for service ${service} on ${ip}:${port}`)
			return
		}

		this._services[key].timestamp= Math.floor(new Date()/1000)
		console.log(`Updated service for service ${service} on ${ip}:${port}`)
	}
}