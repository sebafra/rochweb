import path from 'path'

const settings = {
	token      : {
		secret:     'ts$s38*jsjmjnT1',
		expires:    '1d', // expires in 24 hours
		noexpires:  '100y', // expires in 100 years
	},
	baseUrl    : process.env.BASE_URL || 'http://localhost',
	uploadDir  : process.env.UPLOAD_DIR || '/tmp',
	imagesDir  : process.env.IMAGES_DIR || '../adm/files/',
	url        : function() {
		return this.baseUrl + ':' + this.port
	},
	path       : path.normalize(path.join(__dirname, '..')),
	port       : process.env.NODE_PORT || 3100,
	portHttps  : process.env.NODE_PORT_HTTPS || 4100,
	database   : {
		logging  : 'console.log',
		timezone : '-03:00',
		host     : 'localhost',
		name     : 'rochman'
	},
	pagging    : {
		itemsPerPage  : 10
	},
	pn    		 : {
		android  : {
			key : "AAAAodkUsTQ:APA91bH10qyc5oey2_-I12Ad8PLc85xynNlgiJN4BCqRyn1fJSh57U41DP6pfST39CERLcp7Jr1ZdeQP-ODy2eRE0Vt8eDePmob7hLaRKbEa02eKQnPTanCBZVxQh7Z55kf6HyNjP-AX"
		},
		type : {
			"1":"Notificacion"
		}
	},
	mp : {
	  env: "prod", //"dev",
	  prod  : {
		  accessToken: "APP_USR-3604837006804538-020502-d8106928553fcd07fd6f7f931d6643c0-198521942"
	  },
	  dev : {
		accessToken: "TEST-3604837006804538-020502-6eab6ed4eb57390917dfc19e5259a06a-198521942"
		//accessToken: "TEST-4297521837416041-071123-8dfaa84c5aae7580b859d497d970043a-423762400" //Canadez
		//accessToken: "TEST-633858412918642-110808-a4e0dbdaca11484d6223328f08af50c0-66418844" //Seba
	  },
		url : "https://api.mercadopago.com/v1",
		urlIpn : "https://vps-1060583-x.dattaweb.com:4092/api/mp/ipn"
	}

}


module.exports = settings;
