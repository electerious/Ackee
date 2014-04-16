url			= require 'url'
async		= require 'async'
middleware	= require '../../node/middleware'
db			= null

settings =

	ignore: '-'
	limit: 20

query =

	browsers: ->

		"""
		SELECT browser, count(*) AS users
		 FROM stats
		 WHERE browser<>'#{ settings.ignore }'
		 GROUP BY browser
		 ORDER BY users DESC
		 LIMIT #{ settings.limit }
		"""

	platform: ->

		"""
		SELECT platform, count(*) AS users
		 FROM stats
		 WHERE platform<>'#{ settings.ignore }'
		 GROUP BY platform
		 ORDER BY users DESC
		 LIMIT #{ settings.limit }
		"""

	screens: ->

		"""
		SELECT (screen_width || ' x ' || screen_height) AS resolution, (screen_width * screen_height) AS pixels, count(*) AS users
		 FROM stats
		 WHERE screen_width<>'#{ settings.ignore }' AND screen_height<>'#{ settings.ignore }'
		 GROUP BY resolution
		 ORDER BY users DESC
		 LIMIT #{ settings.limit }
		"""

	duration: ->

		"""
		SELECT -10 * (round((time - duration) / 10)) AS duration, count(*) AS users
		 FROM stats
		 WHERE time<>'#{ settings.ignore }' AND duration<>'#{ settings.ignore }'
		 GROUP BY duration
		 ORDER BY users DESC
		 LIMIT #{ settings.limit }
		"""

	locations: ->

		"""
		SELECT language, count(*) AS users
		 FROM stats
		 WHERE language<>'#{ settings.ignore }'
		 GROUP BY language
		 ORDER BY users DESC
		 LIMIT #{ settings.limit }
		"""

parse =

	users: (rows, callback) ->

		users = 0

		async.each rows, (row, finish) ->
		
			users += row.users
			finish()
			
		, (error) ->
			
			async.each rows, (row, finish) ->
			
				row.percent = Math.round(row.users * (100 / users))
				finish()
				
			, callback

	locations: (rows, callback) ->

		countries =
			af: 'Afghanistan'
			ax: 'Aland Islands'
			al: 'Albania'
			dz: 'Algeria'
			as: 'American Samoa'
			ad: 'Andorra'
			ao: 'Angola'
			ai: 'Anguilla'
			aq: 'Antarctica'
			ag: 'Antigua And Barbuda'
			ar: 'Argentina'
			am: 'Armenia'
			aw: 'Aruba'
			au: 'Australia'
			at: 'Austria'
			az: 'Azerbaijan'
			bs: 'Bahamas'
			bh: 'Bahrain'
			bd: 'Bangladesh'
			bb: 'Barbados'
			by: 'Belarus'
			be: 'Belgium'
			bz: 'Belize'
			bj: 'Benin'
			bm: 'Bermuda'
			bt: 'Bhutan'
			bo: 'Bolivia'
			ba: 'Bosnia And Herzegovina'
			bw: 'Botswana'
			bv: 'Bouvet Island'
			br: 'Brazil'
			io: 'British Indian Ocean Territory'
			bn: 'Brunei Darussalam'
			bg: 'Bulgaria'
			bf: 'Burkina Faso'
			bi: 'Burundi'
			kh: 'Cambodia'
			cm: 'Cameroon'
			ca: 'Canada'
			cv: 'Cape Verde'
			ky: 'Cayman Islands'
			cf: 'Central African Republic'
			td: 'Chad'
			cl: 'Chile'
			cn: 'China'
			cx: 'Christmas Island'
			cc: 'Cocos (Keeling) Islands'
			co: 'Colombia'
			km: 'Comoros'
			cg: 'Congo'
			cd: 'Congo Democratic Republic'
			ck: 'Cook Islands'
			cr: 'Costa Rica'
			ci: 'Cote D\'Ivoire'
			hr: 'Croatia'
			cu: 'Cuba'
			cy: 'Cyprus'
			cz: 'Czech Republic'
			dk: 'Denmark'
			dj: 'Djibouti'
			dm: 'Dominica'
			do: 'Dominican Republic'
			ec: 'Ecuador'
			eg: 'Egypt'
			sv: 'El Salvador'
			gq: 'Equatorial Guinea'
			er: 'Eritrea'
			ee: 'Estonia'
			et: 'Ethiopia'
			fk: 'Falkland Islands (Malvinas)'
			fo: 'Faroe Islands'
			fj: 'Fiji'
			fi: 'Finland'
			fr: 'France'
			gf: 'French Guiana'
			pf: 'French Polynesia'
			tf: 'French Southern Territories'
			ga: 'Gabon'
			gm: 'Gambia'
			ge: 'Georgia'
			de: 'Germany'
			gh: 'Ghana'
			gi: 'Gibraltar'
			gr: 'Greece'
			gl: 'Greenland'
			gd: 'Grenada'
			gp: 'Guadeloupe'
			gu: 'Guam'
			gt: 'Guatemala'
			gg: 'Guernsey'
			gn: 'Guinea'
			gw: 'Guinea-Bissau'
			gy: 'Guyana'
			ht: 'Haiti'
			hm: 'Heard Island & Mcdonald Islands'
			va: 'Holy See (Vatican City State)'
			hn: 'Honduras'
			hk: 'Hong Kong'
			hu: 'Hungary'
			is: 'Iceland'
			in: 'India'
			id: 'Indonesia'
			ir: 'Iran Islamic Republic Of'
			iq: 'Iraq'
			ie: 'Ireland'
			im: 'Isle Of Man'
			il: 'Israel'
			it: 'Italy'
			jm: 'Jamaica'
			jp: 'Japan'
			je: 'Jersey'
			jo: 'Jordan'
			kz: 'Kazakhstan'
			ke: 'Kenya'
			ki: 'Kiribati'
			kr: 'Korea'
			kw: 'Kuwait'
			kg: 'Kyrgyzstan'
			la: 'Lao People\'s Democratic Republic'
			lv: 'Latvia'
			lb: 'Lebanon'
			ls: 'Lesotho'
			lr: 'Liberia'
			ly: 'Libyan Arab Jamahiriya'
			li: 'Liechtenstein'
			lt: 'Lithuania'
			lu: 'Luxembourg'
			mo: 'Macao'
			mk: 'Macedonia'
			mg: 'Madagascar'
			mw: 'Malawi'
			my: 'Malaysia'
			mv: 'Maldives'
			ml: 'Mali'
			mt: 'Malta'
			mh: 'Marshall Islands'
			mq: 'Martinique'
			mr: 'Mauritania'
			mu: 'Mauritius'
			yt: 'Mayotte'
			mx: 'Mexico'
			fm: 'Micronesia Federated States Of'
			md: 'Moldova'
			mc: 'Monaco'
			mn: 'Mongolia'
			me: 'Montenegro'
			ms: 'Montserrat'
			ma: 'Morocco'
			mz: 'Mozambique'
			mm: 'Myanmar'
			na: 'Namibia'
			nr: 'Nauru'
			np: 'Nepal'
			nl: 'Netherlands'
			an: 'Netherlands Antilles'
			nc: 'New Caledonia'
			nz: 'New Zealand'
			ni: 'Nicaragua'
			ne: 'Niger'
			ng: 'Nigeria'
			nu: 'Niue'
			nf: 'Norfolk Island'
			mp: 'Northern Mariana Islands'
			no: 'Norway'
			om: 'Oman'
			pk: 'Pakistan'
			pw: 'Palau'
			ps: 'Palestinian Territory Occupied'
			pa: 'Panama'
			pg: 'Papua New Guinea'
			py: 'Paraguay'
			pe: 'Peru'
			ph: 'Philippines'
			pn: 'Pitcairn'
			pl: 'Poland'
			pt: 'Portugal'
			pr: 'Puerto Rico'
			qa: 'Qatar'
			re: 'Reunion'
			ro: 'Romania'
			ru: 'Russian Federation'
			rw: 'Rwanda'
			bl: 'Saint Barthelemy'
			sh: 'Saint Helena'
			kn: 'Saint Kitts And Nevis'
			lc: 'Saint Lucia'
			mf: 'Saint Martin'
			pm: 'Saint Pierre And Miquelon'
			vc: 'Saint Vincent And Grenadines'
			ws: 'Samoa'
			sm: 'San Marino'
			st: 'Sao Tome And Principe'
			sa: 'Saudi Arabia'
			sn: 'Senegal'
			rs: 'Serbia'
			sc: 'Seychelles'
			sl: 'Sierra Leone'
			sg: 'Singapore'
			sk: 'Slovakia'
			si: 'Slovenia'
			sb: 'Solomon Islands'
			so: 'Somalia'
			za: 'South Africa'
			gs: 'South Georgia And Sandwich Isl.'
			es: 'Spain'
			lk: 'Sri Lanka'
			sd: 'Sudan'
			sr: 'Suriname'
			sj: 'Svalbard And Jan Mayen'
			sz: 'Swaziland'
			se: 'Sweden'
			ch: 'Switzerland'
			sy: 'Syrian Arab Republic'
			tw: 'Taiwan'
			tj: 'Tajikistan'
			tz: 'Tanzania'
			th: 'Thailand'
			tl: 'Timor-Leste'
			tg: 'Togo'
			tk: 'Tokelau'
			to: 'Tonga'
			tt: 'Trinidad And Tobago'
			tn: 'Tunisia'
			tr: 'Turkey'
			tm: 'Turkmenistan'
			tc: 'Turks And Caicos Islands'
			tv: 'Tuvalu'
			ug: 'Uganda'
			ua: 'Ukraine'
			ae: 'United Arab Emirates'
			gb: 'United Kingdom'
			us: 'United States'
			um: 'United States Outlying Islands'
			uy: 'Uruguay'
			uz: 'Uzbekistan'
			vu: 'Vanuatu'
			ve: 'Venezuela'
			vn: 'Viet Nam'
			vg: 'Virgin Islands British'
			vi: 'Virgin Islands U.S.'
			wf: 'Wallis And Futuna'
			eh: 'Western Sahara'
			ye: 'Yemen'
			zm: 'Zambia'
			zw: 'Zimbabwe'

		async.each rows, (row, finish) ->
		
			row.location = row.language || 'Unknown'
			row.location = countries[row.language] if countries.hasOwnProperty row.language
			delete row.language
			finish()
			
		, callback

get =

	browsers: (req, res) ->

		db.all query.browsers(), (error, rows) ->

			if error
				res.json { error: 'Could not get data from database', details: error }
				return false
			else
				parse.users rows
				res.json rows
				return true

	platform: (req, res) ->

		db.all query.platform(), (error, rows) ->

			if error
				res.json { error: 'Could not get data from database', details: error }
				return false
			else
				parse.users rows, ->
					res.json rows
					return true

	screens: (req, res) ->

		db.all query.screens(), (error, rows) ->

			if error
				res.json { error: 'Could not get data from database', details: error }
				return false
			else
				parse.users rows, ->
					res.json rows
					return true

	duration: (req, res) ->

		db.all query.duration(), (error, rows) ->

			if error
				res.json { error: 'Could not get data from database', details: error }
				return false
			else
				parse.users rows, ->
					res.json rows
					return true

	locations: (req, res) ->

		db.all query.locations(), (error, rows) ->

			if error
				res.json { error: 'Could not get data from database', details: error }
				return false
			else
				parse.users rows, ->
					parse.locations rows, ->
						res.json rows
						return true

module.exports = (app, _db) ->

	db = _db
	app.get '/api/get/users/browsers', middleware.auth, get.browsers
	app.get '/api/get/users/platform', middleware.auth, get.platform
	app.get '/api/get/users/screens', middleware.auth, get.screens
	app.get '/api/get/users/duration', middleware.auth, get.duration
	app.get '/api/get/users/locations', middleware.auth, get.locations