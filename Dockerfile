FROM --platform=$BUILDPLATFORM  node:current-alpine AS build

WORKDIR /dist/src/app

RUN npm install -g @angular/cli

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build --prod

# ------------- MAIN ---------------
FROM nginx:latest AS ngi

WORKDIR /usr/share/nginx

# Add binaries
COPY --from=build /dist/src/app/dist/frontend/browser/ /usr/share/nginx/html
COPY ./docker/site.conf /etc/nginx/conf.d/default.conf

# Set version label
LABEL org.opencontainers.image.source="https://github.com/cyr-ius/viewpicam-frontend"
LABEL org.opencontainers.image.description="Frontend Viewpicam - inspired by Rpi Cam Interface"
LABEL org.opencontainers.image.licenses="MIT"
LABEL maintainer="cyr-ius"

ARG VERSION
ENV VERSION=${VERSION}

EXPOSE 80/tcp
