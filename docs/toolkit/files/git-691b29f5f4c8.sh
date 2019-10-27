#!/usr/bin

# 安装编译git时需要的包
yum install -y curl-devel expat-devel gettext-devel openssl-devel zlib-devel
yum install -y gcc perl-ExtUtils-MakeMaker
sleep 1s

# 删除已有的git
yum remove -y git
sleep 1s

# 下载git源码
cd /usr/src
wget https://www.kernel.org/pub/software/scm/git/git-2.0.5.tar.gz
tar xzf git-2.0.5.tar.gz
sleep 5s

# 编译安装
cd git-2.0.5
make prefix=/usr/local/git all
sleep 5s
make prefix=/usr/local/git install
sleep 5s

# echo "export PATH=$PATH:/usr/local/git/bin" >> /etc/bashrc
# source /etc/bashrc

# 检查一下版本号
# git --version
