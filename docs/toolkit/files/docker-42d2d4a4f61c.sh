# 1、卸载旧版本(如果安装过旧版本的话)
sudo yum remove -y docker docker-common docker-selinux docker-engine

# 2、安装需要的软件包， yum-util 提供yum-config-manager功能，另外两个是devicemapper驱动依赖的
sudo yum install -y yum-utils device-mapper-persistent-data lvm2

# 3、设置yum源
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# 4、安装
yum list docker-ce --showduplicates | sort -r
sudo yum install -y docker-ce
# sudo yum install docker-ce-17.12.0.ce

# 5、启动并加入开机启动
sudo systemctl start docker
sudo systemctl enable docker

docker version
