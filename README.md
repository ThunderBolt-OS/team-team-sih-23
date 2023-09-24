
# AnyBus

Real-Time Vehicle Tracking system.


## Installation

### Clone the Repo
  
  ```bash
  git clone https://github.com/ThunderBolt-OS/team-team-sih-23.git
  ```

### Admin Dashboard
  
  ```bash
    cd dashboard-ts
    npm install
    npm run dev
  ```

### User App

```bash
  cd civil_app
  npm install
  npm run dev
```

### Driver App
  
  ```bash
    cd driver_app
    npm install
    npm run dev
  ```

### Backend

1. Install Python virtualenv for backend

```bash
cd backend
pip install virtualenv
```

2. Create a virtual environment

```bash
python -m virtualenv venv # for windows
python3 -m virtualenv venv # for linux
```

3. Activate the virtual environment

```bash
venv\Scripts\activate # for windows
source venv/bin/activate # for linux
```

4. Install dependencies

```bash
pip install -r requirements.txt
```

5. Start the backend

- make sure to add `0.0.0.0:8008` in the end to make it accessible from other devices in the same network.

```bash
python manage.py runserver 0.0.0.0:8008
```

### Redis server installation

#### For Windows

- Make sure to install `wsl` and install latest version of `Ubuntu` from Microsoft Store.
- Install Redis server in Ubuntu

```bash
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list

sudo apt-get update

sudo apt-get install redis
```

- Start the redis server

```bash
sudo service redis-server start
```

- Connect to redis
  - You can test that your Redis server is running by connecting with the Redis CLI:

```bash
redis-cli
```

if you see the following output, then you are good to go.

```bash
redis-cli
127.0.0.1:6379> ping
PONG
```

#### For Mac OS

open terminal and run the following commands

```bash
brew install redis
```

- Start the redis server

```bash
redis-server
```

As an alternative to running Redis in the foreground, you can also use launchd to start the process in the background:

```bash
brew services start redis
```

This launches Redis and restarts it at login. You can check the status of a launchd managed Redis by running the following:

```bash
brew services info redis
```

If the service is running, you'll see output like the following:

```bash
redis (homebrew.mxcl.redis)
Running: ✔
Loaded: ✔
User: miranda
PID: 67975
```

- To stop the service, run:

```bash
brew services stop redis
```

#### For Linux

SAME AS WINDOWS INSTALLTION PROCESS

## Language and tools used

<div align="left">
  <img src="https://skillicons.dev/icons?i=firebase" height="40" alt="firebase logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=aws" height="40" alt="amazonwebservices logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" height="40" alt="kubernetes logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain-wordmark.svg" height="40" alt="docker logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/anaconda/anaconda-original.svg" height="40" alt="anaconda logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg" height="40" alt="chrome logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="40" alt="css3 logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" height="40" alt="django logo"  />
  <img width="12" />
  <img src="https://cdn.simpleicons.org/git/F05032" height="40" alt="git logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" height="40" alt="linux logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg" height="40" alt="materialui logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" height="40" alt="mysql logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=nginx" height="40" alt="nginx logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" height="40" alt="npm logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" height="40" alt="python logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="40" alt="react logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" height="40" alt="redis logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" height="40" alt="tensorflow logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" height="40" alt="vscode logo"  />
  <img width="12" />
  <img src="https://cdn.simpleicons.org/postman/FF6C37" height="40" alt="postman logo"  />
  <img width="12" />
  <img src="https://cdn.simpleicons.org/stackoverflow/F58025" height="40" alt="stackoverflow logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=ts" height="40" alt="typescript logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=vite" height="40" alt="vite logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=gcp" height="40" alt="googlecloud logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=nodejs" height="40" alt="nodejs logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=jenkins" height="40" alt="nodejs logo"  />
</div>

## Contributors

- [Hussain Pettiwala](https://github.com/pettiboy)
- [ThunderBolt](https://github.com/ThunderBolt-OS)
- [Harshal Dave](https://github.com/HarshalHDave)
- [Aditya Pai](https://github.com/adityapai18)
- [Vinay Kanse](https://github.com/VinayKanase)
- [Divya Nair](https://github.com/Divyaanna)

## Used By

Govt and people of Himachal Pradesh

