<!-- End-User Documentation -->

# BookBot

<!-- intro -->

**Contributers:** Zipeng Ye, Daisy Wang, Lupin Cai, Jake Huang, Yingrong Chen

## 1. Getting Started

1. Use the Link to the Website
2. Or install and run the application locally
<!-- 1. Clone the repository: `git clone https://github.com/your-username/your-repo.git`
3. Navigate to the project directory: `cd your-repo`
4. Install dependencies: `npm install`
5. Start the application: `npm start` -->
3. For running locally on or and windows
    1. Go to `https://www.docker.com/products/docker-desktop/` and download docker-desktop and restart your machine and start docker
    2. Navigate to the project directory: `cd your-repo`
    3. go to config.js `cd client/src/utils` 
    4. edit config.js so that line 18 becomes `baseURL: "http://localhost:8000/api",`
    5. go to directory for client (frontend): `cd client`
    6. build the docker image for frontend: `docker build -t client .`
    7. go to directory for client (frontend): `cd Backend`
    8. build the docker image for frontend: `docker build -t backend .`
    9. go to the root directory: `docker-compose up`-->
4. For running locally on linux
    1. install docker: `sudo yum install docker`
    2. edit config.js so that line 18 becomes `baseURL: "http://localhost:8000/api",`
    3. go to directory for client (frontend): `cd client`
    4. build the docker image for frontend: `docker build -t client .`
    5. go to directory for client (frontend): `cd Backend`
    6. build the docker image for frontend: `docker build -t backend .` 
    7. go to the root directory: `docker-compose up`-->
5. For running on aws ec2
    1. install docker: `sudo yum install docker`
    2. go to config.js `cd client/src/utils` 
    3. edit config.js so that line 18 becomes `baseURL: "http://your public ip address/api",`
    4. go to directory for client (frontend): `cd client`
    5. build the docker image for frontend: `docker build -t client .`
    6. go to directory for client (frontend): `cd Backend`
    7. build the docker image for frontend: `docker build -t backend .` 
    8. install docker-compose: `sudo curl -L "https://github.com/docker/compose/releases/download/v2.2.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose`
    `sudo chmod +x /usr/local/bin/docker-compose`
    9. install nginx: `sudo yum install nginx`
    10. edit nginx config: `sudo nano /etc/nginx/nginx.conf` and replace the server with the following: 
    `server {
        listen       80;
        listen       [::]:80;
        server_name  _;
        root         /usr/share/nginx/html;

        client_max_body_size 50M;

        # Frontend - Node.js server
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

        # Backend - Python server
        location /api {
            proxy_pass http://localhost:8000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # Optionally, remove the /api prefix if not needed by the backend
            proxy_set_header X-Strip-Path /api;

            # time out setting
            proxy_connect_timeout 3000s;
            proxy_read_timeout 3000s;
        }

        # Error pages
        error_page 404 /404.html;
        location = /404.html {
        }

        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
        }
    }`
    11. reconfig and restart nginx: `sudo nginx -t` `sudo systemctl restart nginx`
    12. go to the root directory: `docker-compose up`

## 2. Features

1. Sign Up, Login and Create a Profile, also can use google login
<!-- screenshots of the website -->
2. Explore Books by Name and Genre, and Upload Your Own Books

3. Ask Questions and Get Answers supported by Original Text, Save Questions to Your Profile and the Community

4. See and Interact with Other People’s Questions

5. Edit personal profile of username, bio, avatar

6. See other user's and one's own profile with username, bio, avatar and history inquiry
