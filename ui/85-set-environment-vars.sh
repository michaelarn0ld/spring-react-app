#!/bin/sh
cat << EOF > /usr/share/nginx/html/config.js
window.USER_SERVICE_URL = "http://${USER_SERVICE_HOSTNAME}:8080";
window.FACILITY_SERVICE_URL = "http://${FACILITY_SERVICE_HOSTNAME}:8081";
EOF