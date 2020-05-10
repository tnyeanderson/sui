FROM busybox

WORKDIR /opt/html

ADD app /opt/html/

EXPOSE 80

ENTRYPOINT [ "httpd", "-f", "-v", "-u", "1000" ]
