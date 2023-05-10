msg=$1
branch=$(git branch | grep \* | cut -d " " -f2)

if [ "${msg}" == "" ]
then 
  echo "请输入commit msg"
  exit 1
fi
git add .
git commit -m "${msg}"
git pull origin ${branch}
git push

# sh rl.sh "msg"
# 或者 chmod +x ./rl.sh
# 之后就可以 ./rl.sh "msg"