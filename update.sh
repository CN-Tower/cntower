#!/bin/bush

clear

git reset --hard
git pull --reb

systemctl stop nginx
rm -rf /etc/nginx/nginx.conf
cp nginx.conf /etc/nginx/

systemctl start nginx
systemctl enable nginx
