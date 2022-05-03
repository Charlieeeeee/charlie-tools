# 部署文档
deployDocs () {
  npm run docs:build
  rm -rf ./../charlie-tools-docs
  mkdir ./../charlie-tools-docs
  cp -r ./docs/.vuepress/dist/ ./../charlie-tools-docs/
  cd ./../charlie-tools-docs/
  git init
  git remote add origin https://github.com/Charlieeeeee/charlie-tools.git
  git add .
  git commit -m "chore: update docs"
  git branch -m docs
  git push --force -u origin docs
  echo ""
}

deployDocs