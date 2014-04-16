### Server Settings

The server settings are located in the `package.json`:

	"config" : {
		"debug": false,
		"port" : "8888",
		"portSSL" : "8889"
	}
	
To edit this settings, do **not** modifiy the file in any way. Instead use the `npm config` command. This allows you to set settings only for your local machine. You need to restart Ackee to see changes taking effect.

#### Debug

Type: `String`  
Default: `false`

If set to `true`, Ackee will output every request made to the server.

	npm config set Ackee:debug false

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
	
### User Settings

All user-settings are located in a table called `settings` of your database. This database is lcoated in `data/`, which doesn't exist until you installed Ackee. You can change the properties manually, but we recommend to use the menus in Ackee.

#### Username

Type: `String`  
Default: -

Your personal username. This username is used along with your password to protect your data.

#### Password

Type: `String`  
Default: -

A md5-hash of your password. This password is used along with your username to protect your data.