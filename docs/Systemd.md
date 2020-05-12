# Configuring Ackee with Systemd
*We assume your Ackee is located in /opt/Ackee*

 1. Make index.js executable with: `chmod +x /opt/Ackee/src/index.js`
 2. Create a file /etc/systemd/system/ackee.service
```
[Unit]
Description=Ackee

[Service]
ExecStart=/opt/Ackee/src/index.js
Restart=always
User=nobody
Group=nogroup
Environment=PATH=/usr/bin:/usr/local/bin
Environment=NODE_ENV=production
WorkingDirectory=/opt/Ackee

[Install]
WantedBy=multi-user.target
```
3. Start the service with: `systemctl start ackee.service`, check status with `systemctl status ackee.service` output should look like this:
```
Ackee systemd[1]: Started Ackee.
[Ackee] <E2><80><BA> <E2><80><A6>  awaiting  Connecting to mongodb://localhost:27017/ackee
(node:22526) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and
[Ackee] <E2><80><BA> <E2><9C><94>  success   Connected to mongodb://localhost:27017/ackee
[Ackee] <E2><80><BA> <E2><96><B6>  start     Starting the server
[Ackee] <E2><80><BA> <E2><80><A6>  watching  Listening on http://localhost:3000
```
4. Enable the service on boot with `systemctl enable ackee.service`
