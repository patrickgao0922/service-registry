class ServiceRegistry {
	constructor() {
		this._services = []
		this._timeout = 30
	}

	add(service,ip,port) {
		let key = service + ip + port

		if (!this._services[key]) {
			this._services[key] = {}
			this._services[key].timestamp= Math.floor(new Date()/1000)
			this._services[key].ip = ip
			this._services[key].port = port
			this._services[key].service = service
			console.log(`Added service for service ${service} on ${ip}:${port}`)
			this._cleanup()
			return
		}

		this._services[key].timestamp= Math.floor(new Date()/1000)
		console.log(`Updated service for service ${service} on ${ip}:${port}`)
		this._cleanup()
		return
	}

	remove(service, ip, port) {
		let key = service + ip + port
		delete this._services[key]
	}

	get(service) {
		this._cleanup()
		for (let key in this._services) {
			if (this._services[key].service == service) return this.services[key]
			return null
		}
	}

	_cleanup() {
		let now = Math.floor(new Date() / 1000)

		for (let key in this._services) {
			if (this._services[key].timestamp + this._timeout < now){
				delete this._services[key]
				console.log(`Removed service for service ${this._services[key].service}`)
			}
		}
	}
}

export default ServiceRegistry