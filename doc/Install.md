1. Clone the repository: `git clone https://github.com/DaisyWang919/temp370Project.git`
2. Navigate to the project directory: `cd temp370Project`
3. For running locally on or and windows
   Go to `https://www.docker.com/products/docker-desktop/` and download docker-desktop and restart your machine and start docker
    - go to config.js `cd client/src/utils`
    - edit config.js so that line 18 becomes `baseURL: "http://localhost:8000/api",`
    - go to directory for client (frontend): `cd client`
    - build the docker image for frontend: `docker build -t client .`
    - go to directory for client (backend): `cd Backend`
    - build the docker image for backend: `docker build -t backend .`
    - go to the root directory: `docker-compose up`

4. For running locally on linux
   install docker: `sudo yum install docker`

    - go to config.js `cd client/src/utils`
    - start docker `sudo systemctl start docker`
    - edit config.js so that line 18 becomes `baseURL: "http://localhost:8000/api",`
    - go to directory for client (frontend): `cd client`
    - build the docker image for frontend: `docker build -t client .`
    - go to directory for client (backend): `cd Backend`
    - build the docker image for backend: `docker build -t backend .`
    - go to the root directory: `docker-compose up`

3. For running on aws ec2
    - install docker: `sudo yum install docker`
    - start docker `sudo systemctl start docker`
    - go to config.js `cd client/src/utils`
    - edit config.js so that line 18 becomes `baseURL: "http://your public ip address/api",`
    - go to directory for client (frontend): `cd client`
    - build the docker image for frontend: `docker build -t client .`
    - go to directory for client (frontend): `cd Backend`
    - build the docker image for frontend: `docker build -t backend .`
    - install docker-compose: `sudo curl -L "https://github.com/docker/compose/releases/download/v2.2.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose`
    `sudo chmod +x /usr/local/bin/docker-compose`
    - install nginx: `sudo yum install nginx`
    - edit nginx config: `sudo nano /etc/nginx/nginx.conf` and replace the server with the following:
    - reconfig and restart nginx: `sudo nginx -t` `sudo systemctl restart nginx`
    - go to the root directory: `docker-compose up`
```json
server {
listen 80;
listen [::]:80;
server_name _;
root /usr/share/nginx/html;

client_max_body_size 50M;
location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
location /api {
    proxy_pass http://localhost:8000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_connect_timeout 3000s;
    proxy_read_timeout 3000s;
}
error_page 404 /404.html;
location = /404.html {

}

error_page 500 502 503 504 /50x.html;
location = /50x.html {
}

}
```
