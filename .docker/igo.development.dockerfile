# Create image based on the official Node 6 image from dockerhub
FROM node:6.6

ENV HOME=/home/app
ENV APP_NAME=igo
ENV USER=app

# Install Chrome
RUN curl https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update && apt-get install -y xvfb google-chrome-stable \
    && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ADD ./.docker/xvfb.sh /etc/init.d/xvfb
ADD ./.docker/entrypoint.sh /entrypoint.sh

RUN chmod +x /etc/init.d/xvfb \
    && chmod +x /entrypoint.sh

ENV DISPLAY :99.0
ENV CHROME_BIN /usr/bin/google-chrome

# prepare a user which runs everything locally! - required in child images!
RUN useradd --user-group --create-home --shell /bin/false $USER

# before switching to user we need to set permission properly
# copy all files, except the ignored files from .dockerignore
WORKDIR $HOME
#COPY . $HOME/$APP_NAME/
COPY package.json $HOME/$APP_NAME/
RUN chown -R $USER:$USER $HOME/*

USER $USER
WORKDIR $HOME/$APP_NAME

# Install dependecies
RUN npm install

# Expose the port the app runs in
EXPOSE 4200

ENTRYPOINT ["/entrypoint.sh"]
