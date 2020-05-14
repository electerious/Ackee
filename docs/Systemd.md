# Systemd

This guide shows you how to configure Ackee with systemd. We assume that your Ackee is located and installed in `/opt/Ackee`.

## 1. Make Ackee executable

Make the `index.js` executable with `chmod +x /opt/Ackee/src/index.js`.

## 2. Create the service

Create a file named `ackee.service` in `/etc/systemd/system/`.
 
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

# 3. Start the service

Start the service with `systemctl start ackee.service` and check if everything is up and running with `systemctl status ackee.service`.

# 4. Enable the service

Enable the service on boot with `systemctl enable ackee.service`.
