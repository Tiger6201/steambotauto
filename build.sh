# !/bin/bash
if [ "$CF_PAGES_BRANCH" == "production" ]; then
  npm install express
  npm install --prefix client
  npm run build --prefix client
  node index.js

elif [ "$CF_PAGES_BRANCH" == "staging" ]; then
  npm install express
  npm install --prefix client
  npm run build --prefix client
  node index.js
else
  npm install express
  npm install --prefix client
  npm run build --prefix client
  node index.js
fi
