ProxyRequests Off
ProxyPreserveHost On
ProxyVia Full
<Proxy *>
        Require all granted
</Proxy>
<Location />
   ProxyPass http://127.0.0.1:3100/
   ProxyPassReverse http://127.0.0.1:3100/
</Location>


## Ejemplo Diperos ##



<VirtualHost *:80>
ServerAlias diperos.com www.diperos.com
ServerAdmin webmaster@diperos.com
DocumentRoot /home/diperos/public_html
ServerName www.diperos.com
ErrorLog domlogs/diperos-error_log
CustomLog domlogs/diperos-access_log combined
LogFormat "%{%s}t %B ." bytes_count
CustomLog domlogs/diperos-bytes_log bytes_count
#ScriptAlias /cgi-bin/ /home/diperos/public_html/cgi-bin/

#LogSQLTransferLogTable diperos
#LogSQLTransferLogFormat AbHhMmRSsTtUuvio

SuexecUserGroup diperos diperos
ScriptAlias /cgi-sys/ /opt/apache/cgi-sys/diperos/

ProxyRequests Off
ProxyPreserveHost On
ProxyVia Full
<Proxy *>
        Require all granted
</Proxy>
<Location />
   ProxyPass http://127.0.0.1:3098/
   ProxyPassReverse http://127.0.0.1:3098/
</Location>
</VirtualHost>



## Borrado del original ##


<IfModule mod_bw.c>
BandwidthModule Off
ForceBandWidthModule Off
LargeFileLimit .avi 1024 100000
LargeFileLimit .mpg 1024 100000
LargeFileLimit .zip 1024 100000
LargeFileLimit .rar 1024 100000
LargeFileLimit .mpeg 1024 100000
LargeFileLimit .tgz 1024 100000
LargeFileLimit .mp3 1024 100000
LargeFileLimit .mp4 1024 100000
LargeFileLimit .nrg 1024 100000
LargeFileLimit .iso 1024 100000
LargeFileLimit .pdf 1024 100000
LargeFileLimit .exe 1024 100000
LargeFileLimit .gzip 1024 100000
LargeFileLimit .tar.gz 1024 100000
LargeFileLimit .wmv 1024 100000
LargeFileLimit .ogm 1024 100000
LargeFileLimit .mkv 1024 100000
LargeFileLimit .wma 1024 100000
LargeFileLimit .aac 1024 100000
LargeFileLimit .webm 1024 100000
LargeFileLimit .flv 1024 100000
</IfModule>
 
#<IfModule mod_deflate.c>
#<IfModule mod_headers.c>
#Header append Vary User-Agent env=!dont-vary
#</IfModule>
#SetOutputFilter DEFLATE
#AddOutputFilterByType DEFLATE text/css text/x-component application/x-javascript application/javascript text/javascript text/x-js text/html text/richtext image/svg+xml text/plain text/xsd text/xsl text/xml image/x-icon application/json
#SetEnvIfNoCase Request_URI .(?:exe|t?gz|zip|iso|tar|bz2|sit|rar) no-gzip dont-vary
#SetEnvIfNoCase Request_URI .(?:gif|jpe?g|jpg|ico|png)  no-gzip dont-vary
#SetEnvIfNoCase Request_URI .pdf no-gzip dont-vary
#SetEnvIfNoCase Request_URI .flv no-gzip dont-vary
#BrowserMatch ^Mozilla/4 gzip-only-text/html
#BrowserMatch ^Mozilla/4.0[678] no-gzip
#BrowserMatch \bMSIE !no-gzip !gzip-only-text/html
#<IfModule mod_mime.c>
#AddOutputFilter DEFLATE js css htm html xml
#</IfModule>
#</IfModule>

RewriteEngine On
RewriteRule ^/ferozo/?$  http://%{HTTP_HOST}:2082 [L,R]
RewriteRule ^/dpanel/?$  http://%{HTTP_HOST}:2082 [L,R]
RewriteRule ^/dattapanel/?$  http://%{HTTP_HOST}:2082 [L,R]
RewriteRule ^/fzadmin/?$  http://%{HTTP_HOST}:2083 [L,R]
RewriteRule ^/dhm/?$  http://%{HTTP_HOST}:2083 [L,R]
RewriteRule ^/webmail/?$  https://vps-1060583-x.dattaweb.com:2094 [L,R]
RewriteRule ^/ferozosite/?$  http://%{HTTP_HOST}:2085 [L,R]
RewriteRule ^/exchange/?$  http://%{HTTP_HOST}:2087 [L,R]
RewriteRule ^/ferozossl/?$ https://vps-1060583-x.ferozo.com:2092 [L,R]
RewriteRule ^/dpanelssl/?$ https://vps-1060583-x.ferozo.com:2092 [L,R]
RewriteRule ^/dattapanelssl/?$ https://vps-1060583-x.ferozo.com:2092 [L,R]
RewriteRule ^/webmailssl/?$ https://vps-1060583-x.dattaweb.com:2094 [L,R]
RewriteOptions inherit