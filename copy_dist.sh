rm -rf dist
mkdir dist
mkdir -p ./dist/src
mkdir -p ./dist/src/imgs
mkdir -p ./dist/src/css
mkdir -p ./dist/vendors
mkdir -p ./dist/template
mkdir -p ./dist/imgs

cp -rf ./vendors/* ./dist/vendors/
cp -rf ./src/imgs/* ./dist/src/imgs/
cp -rf ./src/css/* ./dist/src/css/
cp -rf ./template/* ./dist/template/
cp -rf ./imgs/* ./dist/imgs/
cp index.html ./dist/
cp developer.html ./dist/
cp bundle.js ./dist/

rm -rf ../xhackerweb/yuanzimao_market
mkdir -p ../xhackerweb/yuanzimao_market
cp -rf ./dist/* ../xhackerweb/yuanzimao_market
cd ../xhackerweb
sh complie.sh


