# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://vagrantcloud.com/search.
  config.vm.box = "bento/centos-7.4"
  # config.vm.box = "archlinux/archlinux"

  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  # NOTE: This will enable public access to the opened port
  # config.vm.network "forwarded_port", guest: 80, host: 8080

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine and only allow access
  # via 127.0.0.1 to disable public access
  # config.vm.network "forwarded_port", guest: 80, host: 8080, host_ip: "127.0.0.1"

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  # config.vm.network "private_network", ip: "192.168.33.10"

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  config.vm.synced_folder ".", "/opt/brigade-matchmaker"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  # config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true
  #
  #   # Customize the amount of memory on the VM:
  #   vb.memory = "1024"
  # end
  #
  # View the documentation for the provider you are using for more
  # information on available options.

  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.
  config.vm.provision "file", source: "./vagrant_fs", destination: "$HOME/fs"
  config.vm.provision "shell", inline: <<-SHELL
    rpm --silent -q deltarpm rsync || yum install -y deltarpm rsync
    rsync -rv /home/vagrant/fs/ /

    # Update packages and install dependencies
    yum update
    rpm --silent -q gcc gcc-c++ git mongodb-org openssl-devel || yum install -y gcc gcc-c++ git mongodb-org openssl-devel

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
