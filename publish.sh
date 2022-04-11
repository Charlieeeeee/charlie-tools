#! /bin/bash

# 1.先检测分支
# 2.更新版本
# 3.提交代码

iterate=$1
name="[CHARLIE-TOOLS]"
dot="."

# 生成声明文件
generateTypingFile () {
  tsc ./src/index.ts -d
  rm -rf ./src/index.js
  cp ./src/index.d.ts ./dist
}

generateTypingFile

checkBranch () {
  branch=$(git branch | grep \* | cut -d " " -f2)
  if [ "$branch" != "master" ]
  then
    echo -e "\033[31m \n Only in master branch can be publish \n \033[0m"
    exit 1
  fi
}

checkBranch

updateVersion () {
  versionLine=$(grep \"version\" package.json)
  version=$(echo ${versionLine} | tr -cd "[0-9].")
  prevSubVersion=$(echo ${version#*.})
  subVersion=$(echo ${prevSubVersion%.*})
  subSubVersion=$(echo ${version##*.})
  manualVersion=$(echo "$iterate" | grep [0-9]\.[0-9]\.[0-9])
  if [ "$iterate" = "i" -o "$iterate" = "ignore" ]
  then
    echo -e "\033[33m${name}: ignore version iteration\033[0m"
  elif [ -z "$iterate" ]
  then
    echo -e "\033[36m${name}: auto version iteration\033[0m"
    newSubSubVersion=`expr $subSubVersion + 1`
    newVersion=$(echo ${version/${dot}${subVersion}${dot}${subSubVersion}/${dot}${subVersion}${dot}${newSubSubVersion}})
    newVersionLine=$(echo "${versionLine/${version}/${newVersion}}")
    sed -i "" "s/${versionLine}/${newVersionLine}/g" "package.json"
  elif [ -n "$manualVersion" ]
    then
    echo -e "\033[35m${name}: manual version iteration - ${manualVersion}\033[0m"
    newVersion=$(echo ${version/${version}/${manualVersion}})
    newVersionLine=$(echo "${versionLine/${version}/${newVersion}}")
    sed -i "" "s/${versionLine}/${newVersionLine}/g" "package.json"
  else
    echo -e "\033[41;37m${name}: please input correct version number\033[0m"
    exit 1
  fi
}

updateVersion


if [ $? -eq 0 ]
then
  pkjV=$(grep \"version\" package.json)
  version=$(echo ${pkjV} | tr -cd "[0-9].")
  git add -A
  git commit -m "release: ${version}"
  git push
  echo -e "\033[32m \ngit success: ${version}\n \033[0m"
else
  echo -e "\033[31m \ngit failed: ${version}\n \033[0m"
fi

npm publish --access=public
