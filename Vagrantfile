# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  ### For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  ### Base machine to use ###
  # config.vm.box = "centos/7"
  config.vm.box = "bento/centos-7.4"
  # config.vm.box = "archlinux/archlinux"
  # config.vm.box = "magneticone/centos-7"
  # config.vm.box = "fedora/27-cloud-base"

  ### Forward component ports ###
  config.vm.network "forwarded_port", guest: 4200, host: 4200, host_ip: "127.0.0.1" # admin
  config.vm.network "forwarded_port", guest: 5465, host: 5465, host_ip: "127.0.0.1" # web
  config.vm.network "forwarded_port", guest: 5475, host: 5475, host_ip: "127.0.0.1" # messaging
  # config.vm.network "forwarded_port", guest: 27017, host: 27017, host_ip: "127.0.0.1" # mongodb

  config.vm.provider "virtualbox" do |v|  
    v.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
    v.customize ["modifyvm", :id, "--natdnsproxy1", "on"]
  end

  # Share the current folder (the git repository) to the host
  config.vm.synced_folder ".", "/opt/brigade-matchmaker"

  # Set up the VM
  config.vm.provision "file", source: "./vagrant_fs", destination: "$HOME/fs"
  config.vm.provision "shell", inline: <<-SHELL
    NODE_USER="vagrant"
    if [ -x "$(command -v yum)" ]; then
      rpm -q deltarpm rsync || yum install -y deltarpm rsync
      rsync -rv /home/vagrant/fs/ /

      # Update packages and install dependencies
      yum update -y
      rpm -q gcc gcc-c++ git mongodb-org openssl-devel || yum install -y gcc gcc-c++ git mongodb-org openssl-devel
   else
      pacman -Qi gcc git mongodb ncurses openssl python rsync > /dev/null && pacman -Syu || pacman -Syu --noconfirm gcc git mongodb ncurses openssl python rsync
      rsync -rv "/home/${NODE_USER}/fs/" /
    fi

    # Install python libraries for matching algo
    command -v pip > /dev/null || curl "https://bootstrap.pypa.io/get-pip.py" -o "get-pip.py"
    command -v pip > /dev/null || python get-pip.py
    pip install pymongo==3.4

    # Install NVM (if needed)
    export NVM_DIR="/opt/nvm"
    [ -x /opt/nvm/nvm-exec ] || curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
    [ -s "${NVM_DIR}/nvm.sh" ] && source "${NVM_DIR}/nvm.sh"
    nvm --version

    # Install node
    NODE_OLD=6.12.2
    NODE_NEW=6.12.2
    nvm list | grep -qE -- "(->|)\s+v${NODE_OLD}\s*" || nvm install "v${NODE_OLD}"

    # Install admin requirements
    nvm list | grep -qE -- "(->|)\s+v${NODE_NEW}\s*" || nvm install "v${NODE_NEW}"
    echo "***** Installing ember-cli..."
    NODE_VERSION="${NODE_NEW}" /opt/nvm/nvm-exec npm list -g ember-cli || NODE_VERSION="${NODE_NEW}" /opt/nvm/nvm-exec npm install -g ember-cli@2.14

    for i in /opt/brigade-matchmaker/components/*; do
      [ -f "${i}/package.json" ] && sudo -u "${NODE_USER}" NODE_VERSION="${NODE_OLD}" /opt/nvm/nvm-exec npm --prefix "${i}" install &
    done

    echo "***** npm install..."
    wait

    # Configure frontend
    [ -e "/opt/brigade-matchmaker/components/web/.env" ] || cp -p /opt/brigade-matchmaker/components/web/heroku.env.example /opt/brigade-matchmaker/components/web/.env

    # Configure content management
    echo "***** Building..."
    sudo -u "${NODE_USER}" NODE_VERSION="${NODE_NEW}" bash -c '(cd /opt/brigade-matchmaker/components/admin && /opt/nvm/nvm-exec ember build)'

    # Start applications
    systemctl enable brigade-matchmaker.target
    systemctl start brigade-matchmaker.target

    # Tell the user
    echo "Provisioning complete!"
  SHELL
end
