#!/bin/sh
set -e

if [[ -z "${FAIRLANCE_URL}" ]]; then
    echo "FAIRLANCE_URL not set."
    exit 1
fi

search="placeholder = \"local.fairlance.io:8000\""
replace="placeholder = \"${FAIRLANCE_URL}\""
sed -i "s/${search}/${replace}/g" /usr/share/nginx/html/index.html

exec "$@"
