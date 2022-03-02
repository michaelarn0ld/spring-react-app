#!/bin/sh
cat << EOF > /usr/share/nginx/html/config.js
window.USER_SERVICE_URL = "${USER_SERVICE_HOSTNAME}";
window.FACILITY_SERVICE_URL = "${FACILITY_SERVICE_HOSTNAME}";
EOF