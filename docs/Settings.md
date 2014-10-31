### Server Settings

The server settings are located in the `package.json`:

	"config" : {
		"debug": false,
		"dnt": true,
		"anonymize": false,
		"port" : "8888",
		"portSSL" : "8889",
		"ignoreIps" : ""
	}
	
To edit this settings, do **not** modify the file in any way. Instead use the `npm config` command. This allows you to set settings only for your local machine. You need to restart Ackee to see changes taking effect.

#### Debug

Type: `Boolean`  
Default: `false`

If set to `true`, Ackee will output every request made to the server.

	npm config set Ackee:debug false
	
#### DNT

Type: `Boolean`  
Default: `true`

If set to `true`, Ackee will not track users, which enabled DoNotTrack in their browsers.

	npm config set Ackee:dnt true
	
#### Anonymize

Type: `Boolean`  
Default: `true`

If set to `true`, Ackee will not save the IP of your visitors.

	npm config set Ackee:dnt true

#### Port

Type: `int`  
Default: `8888`

The port Ackee is listening on.

	npm config set Ackee:port 8888
	
#### SSL Port

Type: `int`  
Default: `8889`

The port Ackee is listening on when requesting data via `https`.

	npm config set Ackee:portSSL 8889

#### Ignore Ips
Type: `string`
Default: Empty

A list of Ip separated by a comma of IP which you don't want to track.
	
	npm config set Ackee:ignoreIps "127.0.0.1"
	npm config set Ackee:ignoreIps "127.0.0.1,8.8.8.8"

### User Settings

All user-settings are located in a table called `settings` of your database. This database is located in `data/`, which doesn't exist until you installed Ackee. You can change the properties manually, but we recommend to use the menus in Ackee.

#### Username

Type: `String`  
Default: -

Your personal username. This username is used along with your password to protect your data.

#### Password

Type: `String`  
Default: -

A md5-hash of your password. This password is used along with your username to protect your data.
