### 发布流程 sh publish.sh

git add .

git commit -m "$1"

git push

echo "----------提交完成----------"

npm version patch

npm publish --access=public

echo "----------发布完成----------"