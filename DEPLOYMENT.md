# 🚀 Ackee Deployment na Coolify

Kompletní průvodce nasazením Ackee analytics na Coolify platformu s Docker Compose.

---

## 📋 Prerequisity

Před začátkem deployment procesu ověřte, že máte:

- ✅ **Coolify instance** (verze 4.0 nebo vyšší)
- ✅ **Doménu připravenou** pro routing (např. `analytics.example.com`)
- ✅ **Git repository access** s read permissions
- ✅ **SSH přístup** k Coolify serveru (pro troubleshooting)
- ✅ **Základní znalost** Docker a Docker Compose

---

## 🎯 Co Získáte

Po úspěšném deployment budete mít:

- 🔒 **Zabezpečenou Ackee instanci** s SSL/TLS
- 📊 **MongoDB databázi** s persistent storage
- 🚪 **Port 3003** expozovaný pro veřejný přístup
- 🔄 **Automatické health checks** a restarty
- 📈 **Production-ready** konfigurace

---

## 📝 Krok za Krokem Deployment

### 1️⃣ Příprava Repository

#### A. Clone nebo Fork Repository

```bash
# Clone original repository
git clone https://github.com/electerious/Ackee.git
cd Ackee

# Nebo fork to your account a pak clone
git clone https://github.com/<your-username>/Ackee.git
cd Ackee
```

#### B. Ověření Konfiguračních Souborů

Ujistěte se, že tyto soubory existují v repository:

```bash
ls -la docker-compose.yml .env.example mongo-init.js
```

Očekávaný výstup:
```
-rw-r--r-- 1 user user  2156 ... docker-compose.yml
-rw-r--r-- 1 user user  1845 ... .env.example
-rw-r--r-- 1 user user  3421 ... mongo-init.js
```

#### C. Commit Změny (pokud jste něco upravovali)

```bash
git add docker-compose.yml .env.example mongo-init.js
git commit -m "Add Coolify-optimized configuration"
git push origin main
```

---

### 2️⃣ Vytvoření Service v Coolify

#### A. Přihlášení do Coolify Dashboard

1. Otevřete Coolify web interface: `https://your-coolify-instance.com`
2. Přihlaste se s admin credentials
3. Vyberte nebo vytvořte **Project**

#### B. Vytvoření Nového Resource

1. V projektu klikněte na **"New Resource"**
2. Vyberte **"Docker Compose"**
3. Zvolte **"Git Repository"** jako source

#### C. Konfigurace Git Repository

Vyplňte následující údaje:

| Pole | Hodnota | Příklad |
|------|---------|---------|
| **Repository URL** | HTTPS URL vašeho repo | `https://github.com/electerious/Ackee.git` |
| **Branch** | Main nebo custom branch | `main` |
| **Compose File Path** | Relativní cesta k souboru | `./docker-compose.yml` |
| **Build Pack** | Docker Compose | (auto-detected) |

#### D. Pokročilé Nastavení (Optional)

- **Auto Deploy**: Povolte pro automatické deployment při git push
- **Watch Paths**: `docker-compose.yml`, `.env.example`
- **Manual Deploy**: Pokud chcete manuální kontrolu před každým deploymentem

---

### 3️⃣ Konfigurace Environment Variables

Coolify automaticky detekuje proměnné z `docker-compose.yml` pomocí `${VARIABLE:?}` syntaxe.

#### A. Povinné Proměnné (Required)

V **Service Settings** → **Environment Variables** vyplňte:

| Variable | Popis | Příklad Hodnoty |
|----------|-------|-----------------|
| `ACKEE_USERNAME` | Admin login username | `admin` |
| `ACKEE_PASSWORD` | Admin login password | `SecureP@ssw0rd123!` |
| `MONGO_USERNAME` | MongoDB root user | `root` |
| `MONGO_PASSWORD` | MongoDB root password | `M0ng0S3cur3P@ss!` |

⚠️ **Bezpečnost**: Použijte silná hesla (min. 16 znaků, mix velkých/malých písmen, čísel, symbolů)

#### B. Volitelné Proměnné (Optional)

| Variable | Default | Popis |
|----------|---------|-------|
| `ACKEE_TTL` | `3600000` | Token TTL v ms (1 hodina) |
| `ACKEE_ALLOW_ORIGIN` | `*` | CORS allowed origins |
| `ACKEE_AUTO_ORIGIN` | `true` | Auto CORS headers |
| `NODE_ENV` | `production` | Node environment |
| `ACKEE_TRACKER` | `tracker.js` | Tracker script name |

#### C. Generování Silných Hesel

Použijte následující příkazy pro generování hesel:

```bash
# Generovat 32 znaků random password
openssl rand -base64 32

# Nebo použít pwgen
pwgen -s 32 1

# Nebo online generator
https://passwordsgenerator.net/
```

#### D. Ukládání Credentials

Coolify automaticky ukládá environment variables šifrovaně. Kromě toho doporučujeme:

1. **Password Manager**: 1Password, Bitwarden, LastPass
2. **Secret Vault**: HashiCorp Vault, AWS Secrets Manager
3. **Team Documentation**: Bezpečný shared dokument s restricted access

---

### 4️⃣ Domain & Port Configuration

#### A. Přidání Domény

1. V **Service Settings** → **Domains** sekci
2. Klikněte **"Add Domain"**
3. Zadejte vaši doménu: `analytics.example.com`
4. Port: `3003` (auto-detekovaný z docker-compose.yml)

#### B. DNS Konfigurace

Před deployment nastavte DNS records:

**Pro custom domain:**
```
Type: A
Name: analytics (nebo @ pro root domain)
Value: <IP adresa Coolify serveru>
TTL: 300 (nebo auto)
```

**Pro subdomain s proxy:**
```
Type: CNAME
Name: analytics
Value: proxy.coolify.example.com
TTL: 300
```

#### C. SSL/TLS Certifikát

1. V **Service Settings** → **SSL/TLS**
2. Povolte **"Auto Generate SSL"**
3. Coolify automaticky získá Let's Encrypt certifikát
4. Certifikát se auto-obnovuje každých 90 dní

#### D. Port Access Modes

**Režim 1: S Portem v URL (Default)**
```
URL: https://analytics.example.com:3003
```
Výhody: Jednoduché, žádná dodatečná konfigurace
Nevýhody: Uživatelé vidí port v URL

**Režim 2: Bez Portu (Reverse Proxy)**
```
URL: https://analytics.example.com
```
Nastavení: Viz sekce "Custom Domain bez Portu" níže

---

### 5️⃣ Volume & Persistence Configuration

Coolify automaticky vytvoří persistent volumes podle `docker-compose.yml`.

#### A. Ověření Volumes

1. V **Service** → **Volumes** tab
2. Měli byste vidět:

| Source | Target | Type | Status |
|--------|--------|------|--------|
| `./data` | `/data/db` | bind | ✅ Active |
| `./mongo-init.js` | `/docker-entrypoint-initdb.d/mongo-init.js` | bind | ✅ Active |

#### B. Volume Backup Setup

**Automatický backup (doporučeno):**

Na Coolify serveru přidejte cron job:

```bash
# Editovat crontab
crontab -e

# Přidat backup každý den ve 2:00 AM
0 2 * * * docker exec ackee-mongo mongodump --out /data/backup/$(date +\%Y\%m\%d) --gzip
```

**Manual backup:**

```bash
# Připojit se k Coolify serveru
ssh user@coolify-server.com

# Backup MongoDB data
docker exec ackee-mongo mongodump --out /data/backup --gzip

# Komprese backup
tar -czf ackee-backup-$(date +%Y%m%d).tar.gz /path/to/data/backup
```

#### C. Restore z Backup

```bash
# Připojit se k serveru
ssh user@coolify-server.com

# Restore MongoDB
docker exec ackee-mongo mongorestore /data/backup/<backup-date>/ --gzip

# Restart Ackee service
docker restart ackee
```

---

### 6️⃣ Deploy!

#### A. Spuštění Deploymentu

1. V Coolify UI klikněte na **"Deploy"** button (zelené)
2. Sledujte deployment logs v real-time
3. Čekejte na úspěšné dokončení (cca 2-5 minut)

#### B. Deployment Fáze

Sledujte tyto fáze v logs:

```
✅ Phase 1: Git clone (10-30s)
   Pulling latest code from repository...

✅ Phase 2: Building images (30-60s)
   Pulling electerious/ackee:latest
   Pulling mongo:7.0-jammy

✅ Phase 3: Starting services (20-40s)
   Creating network ackee-network
   Starting ackee-mongo...
   MongoDB healthcheck passed ✓
   Starting ackee...

✅ Phase 4: Health checks (30-60s)
   Ackee healthcheck (retry 1/3)...
   Ackee healthcheck passed ✓

✅ Phase 5: Deployment complete!
   Service running on port 3003
```

#### C. Monitoring Deployment

**Real-time logs:**
- V Coolify UI: **Service** → **Logs** tab
- Automatický streaming

**CLI monitoring:**
```bash
# Připojit se k serveru
ssh user@coolify-server.com

# Sledovat Ackee logs
docker logs -f ackee

# Sledovat MongoDB logs
docker logs -f ackee-mongo

# Sledovat oba současně
docker-compose logs -f
```

---

### 7️⃣ Verify Deployment

#### A. Health Check Endpoints

Test že služba běží:

```bash
# Test Ackee health endpoint
curl https://analytics.example.com:3003/.well-known/apollo/server-health

# Očekávaný response:
{"status":"pass"}

# Test hlavní stránka
curl -I https://analytics.example.com:3003

# Očekávaný response:
HTTP/2 200
content-type: text/html
```

#### B. GraphQL API Test

```bash
# Test GraphQL playground (pouze v dev mode)
curl https://analytics.example.com:3003/api

# V production mode vrátí:
{"errors":[{"message":"This endpoint is not available in production"}]}
```

#### C. Tracker Script Test

```bash
# Ověřit přístupnost tracking scriptu
curl -I https://analytics.example.com:3003/tracker.js

# Očekávaný response:
HTTP/2 200
content-type: application/javascript
```

---

### 8️⃣ První Přístup do Dashboard

#### A. Otevření Dashboard

1. Otevřete browser
2. Navigate to: `https://analytics.example.com:3003`
3. Měli byste vidět Ackee login screen

#### B. Login

Použijte credentials z environment variables:
- **Username**: hodnota `ACKEE_USERNAME`
- **Password**: hodnota `ACKEE_PASSWORD`

#### C. Vytvoření První Tracked Domain

1. Po přihlášení klikněte **"New Domain"**
2. Zadejte název: např. "My Website"
3. Domain URL: např. `https://example.com`
4. Klikněte **"Add"**

#### D. Implementace Tracking

Copy tracking kód a přidejte do vašeho webu:

```html
<!-- Před </body> tag -->
<script
  async
  src="https://analytics.example.com:3003/tracker.js"
  data-ackee-server="https://analytics.example.com:3003"
  data-ackee-domain-id="YOUR_DOMAIN_ID"
></script>
```

Replace `YOUR_DOMAIN_ID` s ID z Ackee dashboard.

---

## 🔧 Troubleshooting

### ❌ Problem: MongoDB Connection Failed

**Symptom:**
```
Ackee container restartuje každých 30s
Logs ukazují: "MongoError: Authentication failed"
```

**Řešení:**

1. **Zkontrolovat MongoDB status:**
```bash
docker logs ackee-mongo | tail -50
```

2. **Ověřit credentials:**
```bash
# V Coolify UI: Service → Environment Variables
# Check MONGO_USERNAME a MONGO_PASSWORD matchují
```

3. **Restart MongoDB service:**
```bash
docker restart ackee-mongo
# Počkat 60s na healthcheck
docker restart ackee
```

4. **Check connection string:**
```bash
# V environment variables verify:
ACKEE_MONGODB=mongodb://mongo:27017/ackee
# (používá service name 'mongo', ne 'localhost')
```

---

### ❌ Problem: Port 3003 Not Accessible

**Symptom:**
```
Browser error: "ERR_CONNECTION_REFUSED"
curl: (7) Failed to connect to analytics.example.com port 3003
```

**Řešení:**

1. **Verify port v Coolify:**
```
Service → Domains → Zkontrolovat že port 3003 je přidán
```

2. **Check firewall na serveru:**
```bash
ssh user@coolify-server.com

# Check firewall status
sudo ufw status

# Allow port 3003 if blocked
sudo ufw allow 3003/tcp

# Nebo disable firewall pro test (nedoporučeno v produkci)
sudo ufw disable
```

3. **Verify container port mapping:**
```bash
docker ps | grep ackee
# Měli byste vidět: 0.0.0.0:3003->3000/tcp
```

4. **Test local connectivity:**
```bash
# Na Coolify serveru
curl http://localhost:3003

# Pokud funguje lokálně, ale ne vzdáleně → firewall/network issue
```

---

### ❌ Problem: Health Check Failing

**Symptom:**
```
Deployment stuck na "Waiting for health check..."
After 5 minutes: "Health check timeout"
```

**Řešení:**

1. **Manual health check test:**
```bash
docker exec ackee node /app/src/healthcheck.js
echo $?  # Mělo by být 0 (success)
```

2. **Zvýšit start_period:**
```yaml
# V docker-compose.yml
healthcheck:
  start_period: 60s  # Změnit z 30s na 60s
```

3. **Check application logs:**
```bash
docker logs ackee | grep -i error
```

4. **Verify MongoDB je healthy:**
```bash
docker exec ackee-mongo mongosh --eval "db.adminCommand('ping')"
# Očekávaný output: { ok: 1 }
```

---

### ❌ Problem: SSL Certificate Error

**Symptom:**
```
Browser: "Your connection is not private"
Certificate: NET::ERR_CERT_AUTHORITY_INVALID
```

**Řešení:**

1. **Verify DNS propagation:**
```bash
# Check DNS resolves correctly
nslookup analytics.example.com

# Should return Coolify server IP
```

2. **Regenerate SSL cert v Coolify:**
```
Service → SSL/TLS → Delete current cert → Enable "Auto Generate"
```

3. **Check Let's Encrypt rate limits:**
```
https://crt.sh/?q=example.com
# Verify max 5 certs per week not exceeded
```

4. **Manual cert generation:**
```bash
ssh user@coolify-server.com

# Použít certbot
sudo certbot certonly --standalone -d analytics.example.com
```

---

### ❌ Problem: Data Not Persisting After Restart

**Symptom:**
```
Po restartu containeru jsou všechna data ztracená
Domains, statistics, všechno pryč
```

**Řešení:**

1. **Verify volume mount:**
```bash
docker inspect ackee-mongo | grep -A 10 Mounts
# Měli byste vidět bind mount ./data:/data/db
```

2. **Check volume permissions:**
```bash
# Na Coolify serveru
ls -la data/
# Mělo by být owned by mongodb user (999:999)

# Fix permissions if needed
sudo chown -R 999:999 data/
```

3. **Verify data directory exists:**
```bash
ls -la | grep data
# Pokud neexistuje:
mkdir -p data
```

4. **Check disk space:**
```bash
df -h
# Verify dostupné místo na disku
```

---

### ❌ Problem: Slow Performance

**Symptom:**
```
Dashboard načítání trvá 10+ sekund
Analytics queries timeout
```

**Řešení:**

1. **Check MongoDB indexes:**
```bash
docker exec ackee-mongo mongosh ackee --eval "db.records.getIndexes()"
# Měli byste vidět indexy na domainId, created, clientId
```

2. **Recreate indexes:**
```bash
docker exec ackee-mongo mongosh ackee < mongo-init.js
```

3. **Monitor resource usage:**
```bash
docker stats ackee ackee-mongo
# Check CPU/Memory usage
```

4. **Scale resources v Coolify:**
```
Service → Resources → Zvýšit CPU/Memory limits
```

---

## 📊 Monitoring & Maintenance

### 📈 Real-time Monitoring

#### A. Coolify Built-in Monitoring

1. **Service Dashboard:**
   - CPU usage graph
   - Memory usage graph
   - Network I/O
   - Disk usage

2. **Logs Streaming:**
   - Service → Logs tab
   - Real-time nebo historical
   - Filter by severity

#### B. External Monitoring Setup

**Uptime monitoring:**
```bash
# Použít služby jako:
- UptimeRobot: https://uptimerobot.com
- StatusCake: https://www.statuscake.com
- Pingdom: https://www.pingdom.com

# Monitorovat endpoint:
https://analytics.example.com:3003/.well-known/apollo/server-health
```

**Performance monitoring:**
```bash
# Application Performance Monitoring (APM)
- New Relic: Node.js agent
- Datadog: Docker integration
- Prometheus + Grafana: Custom metrics
```

---

### 🔄 Updates & Maintenance

#### A. Aplikace Update

**Method 1: Via Coolify UI (doporučeno)**
1. Service → Redeploy button
2. Coolify pull latest changes z git
3. Rebuild a restart services

**Method 2: Manual Git Update**
```bash
# Update repository
git pull origin main

# V Coolify UI kliknout "Redeploy"
```

**Method 3: Image Update**
```bash
# V docker-compose.yml změnit image tag:
image: electerious/ackee:3.4.2  # Specific version

# Redeploy v Coolify UI
```

#### B. Zero-Downtime Deployment

Přidat do `docker-compose.yml`:

```yaml
services:
  ackee:
    deploy:
      update_config:
        parallelism: 1
        delay: 10s
        order: start-first  # Start new before stopping old
      rollback_config:
        parallelism: 1
        order: stop-first
```

#### C. Database Maintenance

**Weekly cleanup (cron job):**
```bash
# Cleanup old records (starší než 2 roky)
0 3 * * 0 docker exec ackee-mongo mongosh ackee --eval "db.records.deleteMany({created: {\$lt: new Date(Date.now() - 2*365*24*60*60*1000)}})"

# Compact database
0 4 * * 0 docker exec ackee-mongo mongosh ackee --eval "db.runCommand({compact: 'records'})"
```

**Monthly optimization:**
```bash
# Rebuild indexes
docker exec ackee-mongo mongosh ackee --eval "db.records.reIndex()"

# Analyze query performance
docker exec ackee-mongo mongosh ackee --eval "db.records.explain('executionStats').find({domainId: 'xxx'})"
```

---

## 🔒 Security Best Practices

### 🛡️ Mandatory Security Measures

#### 1. Strong Passwords
```bash
# ✅ GOOD:
ACKEE_PASSWORD=X9$mK2pL#vN8qR4tY6wE!zB3cD7fG1hJ

# ❌ BAD:
ACKEE_PASSWORD=admin123
ACKEE_PASSWORD=password
```

#### 2. Regular Updates
```bash
# Update images každý měsíc
docker-compose pull
docker-compose up -d

# Subscribe k security advisories:
https://github.com/electerious/Ackee/security/advisories
```

#### 3. Firewall Configuration
```bash
# Allow pouze port 3003 (Ackee)
sudo ufw allow 3003/tcp

# NEVER expose MongoDB port 27017 publicly!
sudo ufw deny 27017/tcp

# Allow SSH for management
sudo ufw allow 22/tcp

# Enable firewall
sudo ufw enable
```

#### 4. SSL/TLS Enforcement
```nginx
# V reverse proxy (pokud používáte)
server {
    listen 80;
    server_name analytics.example.com;
    return 301 https://$server_name$request_uri;
}
```

#### 5. Environment Variables Security
```bash
# ✅ GOOD: Nikdy necommitovat .env
echo ".env" >> .gitignore

# ✅ GOOD: Používat secrets management
# Coolify auto-encrypts environment variables

# ❌ BAD: Hardcoded secrets v docker-compose.yml
```

---

### 🔐 Advanced Security (Optional)

#### A. Rate Limiting

Add Nginx reverse proxy s rate limiting:

```nginx
limit_req_zone $binary_remote_addr zone=ackee:10m rate=10r/s;

server {
    location / {
        limit_req zone=ackee burst=20;
        proxy_pass http://localhost:3003;
    }
}
```

#### B. IP Whitelisting

Restrict admin access:

```nginx
location / {
    allow 1.2.3.4;      # Your office IP
    allow 5.6.7.8/24;   # Your VPN range
    deny all;

    proxy_pass http://localhost:3003;
}
```

#### C. Two-Factor Authentication

Ackee nemá built-in 2FA, ale můžete přidat external auth:

- **Authelia**: https://www.authelia.com
- **Keycloak**: https://www.keycloak.org
- **OAuth2 Proxy**: https://oauth2-proxy.github.io/oauth2-proxy/

---

## 🌐 Custom Domain (bez Portu)

Pokud chcete `https://analytics.example.com` místo `:3003`:

### Option 1: Nginx Reverse Proxy

#### A. Instalace Nginx na Coolify Server

```bash
ssh user@coolify-server.com
sudo apt update
sudo apt install nginx -y
```

#### B. Konfigurace Nginx

```bash
sudo nano /etc/nginx/sites-available/ackee
```

Přidat config:

```nginx
server {
    listen 80;
    server_name analytics.example.com;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name analytics.example.com;

    # SSL certificates (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/analytics.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/analytics.example.com/privkey.pem;

    # SSL security settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Proxy settings
    location / {
        proxy_pass http://localhost:3003;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket support (pokud potřeba)
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

#### C. Enable Site

```bash
sudo ln -s /etc/nginx/sites-available/ackee /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

### Option 2: Coolify Built-in Proxy

Upravit v Coolify UI:

1. **Service → Domains**
2. **Remove port** z domain field
3. **Add custom proxy** configuration
4. Coolify automaticky routuje port 80/443 → 3003

---

## 📚 Další Resources

### Dokumentace

- **Ackee Official Docs**: https://docs.ackee.electerious.com
- **Coolify Documentation**: https://coolify.io/docs
- **Docker Compose Reference**: https://docs.docker.com/compose/
- **MongoDB Manual**: https://docs.mongodb.com/manual/

### Community Support

- **Ackee GitHub Issues**: https://github.com/electerious/Ackee/issues
- **Coolify Discord**: https://discord.gg/coolify
- **Stack Overflow**: Tag `ackee` nebo `coolify`

### Example Deployments

- **Coolify Examples**: https://github.com/coollabsio/coolify/tree/main/examples
- **Ackee Docker Examples**: https://github.com/electerious/Ackee/tree/master/docs

---

## ✅ Deployment Checklist

Před označením deployment jako complete, ověřte:

### Pre-Deployment
- [ ] Git repository configured
- [ ] Environment variables set (ACKEE_USERNAME, ACKEE_PASSWORD, MONGO credentials)
- [ ] DNS records configured
- [ ] Domain pointed to Coolify server

### Deployment
- [ ] Service created v Coolify
- [ ] Docker Compose file detected
- [ ] Environment variables appear v UI
- [ ] Deploy button clicked
- [ ] Deployment logs show success

### Post-Deployment
- [ ] Health check GREEN pro ackee service
- [ ] Health check GREEN pro mongo service
- [ ] Port 3003 accessible externally
- [ ] SSL certificate valid (HTTPS working)
- [ ] Dashboard login successful
- [ ] Tracking script accessible (`/tracker.js`)
- [ ] Create test domain successful
- [ ] Test pageview recorded

### Security
- [ ] Strong passwords set (16+ characters)
- [ ] MongoDB port 27017 NOT publicly exposed
- [ ] `.env` file in `.gitignore`
- [ ] No hardcoded secrets v compose file
- [ ] Firewall rules configured
- [ ] SSL/TLS enabled

### Monitoring
- [ ] Uptime monitor configured
- [ ] Backup schedule created
- [ ] Log retention policy set
- [ ] Alert notifications configured

---

## 🎉 Success!

Pokud jste dokončili všechny kroky výše, gratulujeme! 🎊

Vaše Ackee instance je nyní:
- ✅ **Live** na `https://analytics.example.com:3003`
- ✅ **Secured** s SSL/TLS encryption
- ✅ **Monitored** s health checks
- ✅ **Backed up** s persistent storage
- ✅ **Production-ready** pro tracking

### Další Kroky:

1. **Add tracking** k vašim webům
2. **Monitor analytics** v dashboard
3. **Schedule backups** (weekly recommended)
4. **Update regularly** (check for new Ackee versions)
5. **Join community** pro support a updates

---

**Vytvořeno:** 2025-11-07
**Verze:** 1.0
**Autor:** Ackee + Coolify Deployment Guide
**License:** MIT
