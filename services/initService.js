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
        // console.log({ "service from init": service });
        (service.length)?((service[0]=='all')?(service = 1):null):null;
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
            for (let i = 0; i < service.length; i++) {
                let s = service[i].trim();

                if (Service.hasOwnProperty(s) && s in Service) {
                    console.log({ s: s, b: s in Service });
                    Service[s](app);
                    console.log(`Initialising Service \`${s}\``);
                } else {
                    console.log(`Initialisation of service \`${s}\` failed!`);
                }
            }
        }
    },
    addService
}

