# !/bin/bash
if [ "$CF_PAGES_BRANCH" == "production" ]; then
  echo "Command 1"
  npm install express
  echo "Command 2"
  npm install --prefix client
  echo "Command 3"
  npm run build --prefix client
  echo "Command 4"
  node index.js
elif [ "$CF_PAGES_BRANCH" == "staging" ]; then
  echo "Command 1"
  npm install express
  echo "Command 2"
  npm install --prefix client
  echo "Command 3"
  npm run build --prefix client
  echo "Command 4"
  node index.js
else
  echo "Command 1"
  npm install express
  echo "Command 2"
  npm install --prefix client
  echo "Command 3"
  npm run build --prefix client
  echo "Command 4"
  node index.js
fi
