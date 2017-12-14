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
  config.vm.box = "bento/centos-7.4"
  # config.vm.box = "archlinux/archlinux"

  ### Forward component ports ###
  config.vm.network "forwarded_port", guest: 4200, host: 4200, host_ip: "127.0.0.1" # ember-client
  config.vm.network "forwarded_port", guest: 5465, host: 5465, host_ip: "127.0.0.1" # web
  config.vm.network "forwarded_port", guest: 5475, host: 5475, host_ip: "127.0.0.1" # messaging
  # config.vm.network "forwarded_port", guest: 27017, host: 27017, host_ip: "127.0.0.1" # mongodb

  # Share the current folder (the git repository) to the host
  config.vm.synced_folder ".", "/opt/brigade-matchmaker"

  # Set up the VM
  config.vm.provision "file", source: "./vagrant_fs", destination: "$HOME/fs"
  config.vm.provision "shell", inline: <<-SHELL
    rpm -q deltarpm rsync || yum install -y deltarpm rsync
    rsync -rv /home/vagrant/fs/ /

    # Update packages and install dependencies
    yum update
    rpm -q gcc gcc-c++ git mongodb-org openssl-devel || yum install -y gcc gcc-c++ git mongodb-org openssl-devel

    # Install python libraries for matching algo
    command -v pip > /dev/null || curl "https://bootstrap.pypa.io/get-pip.py" -o "get-pip.py"
    command -v pip > /dev/null || python get-pip.py
    pip install pymongo==3.4

    # Install NVM
    export NVM_DIR="/opt/nvm"
    command -v nvm > /dev/null || curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
    [ -s "${NVM_DIR}/nvm.sh" ] && source "${NVM_DIR}/nvm.sh"
    nvm --version

    # Install node
    nvm list | grep -qE -- "(->|)\s+v6.9.5\s*" || nvm install v6.9.5

    # Install ember-client requirements
    nvm list | grep -qE -- "(->|)\s+v6.11.1\s*" || nvm install v6.11.1
    NODE_VERSION=6.11.1 /opt/nvm/nvm-exec npm list -g ember-cli || NODE_VERSION=6.11.1 /opt/nvm/nvm-exec npm install -g ember-cli@2.14

    # Configure frontend
    [ -e "/opt/brigade-matchmaker/components/web/.env" ] || cp -p /opt/brigade-matchmaker/components/web/heroku.env.example /opt/brigade-matchmaker/components/web/.env
    sudo -u vagrant NODE_VERSION=6.9.5 /opt/nvm/nvm-exec npm --prefix /opt/brigade-matchmaker/components/web install

    # Configure messaging
    sudo -u vagrant NODE_VERSION=6.9.5 /opt/nvm/nvm-exec npm --prefix /opt/brigade-matchmaker/components/messaging install

    # Configure content management
    if [ -d /opt/brigade/matchmaker/components/ember-client ]; then
      sudo -u vagrant NODE_VERSION=6.11.1 /opt/nvm/nvm-exec npm --prefix /opt/brigade-matchmaker/components/ember-client install
      sudo -u vagrant NODE_VERSION=6.11.1 bash -c '(cd /opt/brigade-matchmaker/components/ember-client && /opt/nvm/nvm-exec ember build)'
    fi

    # Start mongodb
    systemctl enable mongod
    systemctl start mongod

    # Start applications
    systemctl enable brigade-matchmaker.target
    systemctl start brigade-matchmaker.target

    # Tell the user
    echo "Provisioning complete!"
  SHELL
end
