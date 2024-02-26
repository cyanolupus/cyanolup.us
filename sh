#! /bin/sh

mkdir -p $HOME/src/dotfiles
git clone https://github.com/cyanolupus/dotfiles $HOME/src/dotfiles
sh $HOME/src/dotfiles/install.sh
