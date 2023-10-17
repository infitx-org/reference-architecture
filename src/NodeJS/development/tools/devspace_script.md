# File: devspace_start.sh

```bash
#!/bin/bash
set +e  # Continue on errors

echo "Installing dependencies"

# apk add --no-cache -t build-dependencies make gcc g++ python3 libtool libressl-dev openssl-dev autoconf automake
apk add --no-cache -t build-dependencies make gcc g++ python3 libtool openssl-dev autoconf automake bash

npm install -g node-gyp

apk add --no-cache -t ngrep

npm ci

## Example of how to install dependencies based on the lockfile type
# export NODE_ENV=development
# if [ -f "yarn.lock" ]; then
#    echo "Installing Yarn Dependencies"
#    # yarn
# else 
#    if [ -f "package.json" ]; then
#       echo "Installing NPM Dependencies"
#       npm install -g npm@latest-6
#       npm install
#    fi
# fi

COLOR_CYAN="\033[0;36m"
COLOR_RESET="\033[0m"

echo -e "${COLOR_CYAN}
   ____              ____
  |  _ \  _____   __/ ___| _ __   __ _  ___ ___
  | | | |/ _ \ \ / /\___ \| '_ \ / _\` |/ __/ _ \\
  | |_| |  __/\ V /  ___) | |_) | (_| | (_|  __/
  |____/ \___| \_/  |____/| .__/ \__,_|\___\___|
                          |_|
${COLOR_RESET}
Welcome to your development container!

This is how you can work with it:
- Run \`${COLOR_CYAN}npm start${COLOR_RESET}\` to start the application
- Run \`${COLOR_CYAN}npm run dev${COLOR_RESET}\` to start hot reloading
- ${COLOR_CYAN}Files will be synchronized${COLOR_RESET} between your local machine and this container
- Some ports will be forwarded, so you can access this container on your local machine via ${COLOR_CYAN}localhost${COLOR_RESET}:

Use ngrep if you want to monitor inbound & outbound HTTP traffic using the following command: ngrep -qt 'HTTP'

Run the following to start the application:
   node --inspect=0.0.0.0:9229 src/api/index.js
   node --inspect=0.0.0.0:9229 src/handlers/index.js handler --fulfil
   node --inspect=0.0.0.0:9229 src/handlers/index.js handler --prepare --position --fulfil
   CSL_LOG_TRANSPORT="" node --inspect=0.0.0.0:9229 src/handlers/index.js handler --prepare --position --fulfil

   CSL_LOG_TRANSPORT="" node --inspect=0.0.0.0:9229 src/handlers/index.js handler --bulkprepare
   CSL_LOG_TRANSPORT="" node --inspect=0.0.0.0:9229 src/handlers/index.js handler --bulkfulfil

   CSL_LOG_TRANSPORT=console LOG_LEVEL=debug node --inspect=0.0.0.0:9229 src/handlers/index.js handler --bulkprepare
   CSL_LOG_TRANSPORT=console LOG_LEVEL=debug nohup node --inspect=0.0.0.0:9229 src/handlers/index.js handler --bulkprepare > console.log &

   CSL_LOG_TRANSPORT=console LOG_LEVEL=debug node --inspect=0.0.0.0:9229 src/handlers/index.js handler --position
   CSL_LOG_TRANSPORT=console LOG_LEVEL=debug nohup node --inspect=0.0.0.0:9229 src/handlers/index.js handler --position > console.log &

   CSL_LOG_TRANSPORT=console LOG_LEVEL=debug node --inspect=0.0.0.0:9229 src/handlers/index.js handler --timeout
   CSL_LOG_TRANSPORT=console LOG_LEVEL=debug nohup node --inspect=0.0.0.0:9229 src/handlers/index.js handler --timeout > console.log &

   CSL_LOG_TRANSPORT=console LOG_LEVEL=debug node --inspect=0.0.0.0:9229 src/handlers/index.js handler --bulkfulfil
   CSL_LOG_TRANSPORT=console LOG_LEVEL=debug nohup node --inspect=0.0.0.0:9229 src/handlers/index.js handler --bulkfulfil > console.log &
"

# bash
sh

```
