#!/bin/sh
cat << EOF > /usr/share/nginx/html/config.js
window.USER_SERVICE_HOSTNAME = "${USER_SERVICE_HOSTNAME}";
window.FACILITY_SERVICE_HOSTNAME = "${FACILITY_SERVICE_HOSTNAME}";
EOF