let Service = {
    All: () => {
        return 1;
    }
}

let addService = (serviceName, location) => {
    Service[serviceName] = require(location);
}

addService("reactService", "./micros/reactService");;
addService("userAuthService", "./micros/userAuthService");

module.exports = {
    Service,
    serviceInit: (app, service = 1) => {
        if (service == Service.All() || service.length == 0 || service.length == undefined) {
            for (var s in Service) {
                if (Service.hasOwnProperty(s)) {
                    if (s != 'All') {
                        Service[s](app);
                        console.log(`Initialising Service \`${s}\``);
                    }
                } else {
                    console.log(`Initialization of service \`${s}\` failed!`);
                }
            }
        } else {
            if (service.length > 0) {
                for (let s in service) {
                    if (Service.hasOwnProperty(s)) {
                        console.log(`Initialising Service \`${s}\``);
                        Service[s](app);
                    } else {
                        console.log(`Initialization of service \`${s}\` failed!`);
                    }
                }
            }
        }
    },
    addService
}

