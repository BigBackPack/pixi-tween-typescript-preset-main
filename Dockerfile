FROM debian:12.9
RUN apt-get update
RUN apt-get install -y curl git nodejs npm vim
RUN apt-get -y autoclean
CMD ["/bin/bash"]
WORKDIR /home/developer
ADD . /home/developer