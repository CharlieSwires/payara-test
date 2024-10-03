Luggage Calculator
------------------

Install
-------

<p><b>Install JDK17</b></p>
<p><b>Install NodeJS</b></p>
<p><b>Install Git</b></p>
<p>git clone https://github.com/CharlieSwires/payara-test</p>
<p><b>Install Maven</b></p>
<p><b>Install Docker</b></p>

Build/Deploy
------------

<p>mvn clean package</p>
<p>docker build -t luggage-calculator-app .</p>
<p>docker run -e KEYSTORE_PASSWORD=? -p 8443:8443 luggage-calculator-app</p>

browser
-------
<p>https://localhost:8443/payara</p>

User Interface
--------------

Person and Baggage Details
--------------------------

<img src="https://raw.githubusercontent.com/CharlieSwires/payara-test/master/PayaraTestScreen1.jpg" width="1920" height="800" alt="PayaraTestScreen1" title="PayaraTestScreen1"/>

Cost Calculation
----------------

<img src="https://raw.githubusercontent.com/CharlieSwires/payara-test/master/PayaraTestScreen2.jpg" width="1920" height="800" alt="PayaraTestScreen2" title="PayaraTestScreen2"/>

Baggage Ticket
--------------

<img src="https://raw.githubusercontent.com/CharlieSwires/payara-test/master/BaggageTicketScreen3.jpg" width="800" height="800" alt="PayaraTestScreen3" title="PayaraTestScreen3"/>

Payment Screen
--------------

<img src="https://raw.githubusercontent.com/CharlieSwires/payara-test/master/PaymentScreen.png" width="800" height="800" alt="PaymentScreen" title="PaymentScreen"/>



RESTful
-------

<p>GET https://localhost:8443/payara/luggage-calculator/rules</p>
<p>POST https://localhost:8443/payara/luggage-calculator/min-cost</p>
<p>POST https://localhost:8443/payara/luggage-calculator/cost</p>

Keys(self cert)
---------------

<p><b>openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -nodes \
-subj "/C=US/ST=YourState/L=YourCity/O=YourOrganization/OU=YourUnit/CN=yourdomain.com/emailAddress=youremail@example.com"
</b></p>
<p>put these two in /src/main/webapp/luggage-calculator-app</p>
<p><b>keytool -genkeypair -alias tomcat -keyalg RSA -keysize 2048 \
-keystore keystore.p12 -storetype PKCS12 -validity 3650 \
-storepass your_keystore_password</b></p>
<p>put in /src/main/resources</> 

<p><b>.env</b></p>
<code>
HTTPS=true<br />
SSL_CRT_FILE=src/main/resources/static/cert.pem<br />
SSL_KEY_FILE=src/main/resources/static/key.pem<br />
</code>
<p><b>application.properties</b></p>
<code>
server.servlet.context-path=/payara<br />
server.port=8443<br />
server.ssl.key-store=classpath:keystore.p12<br />
server.ssl.key-store-password=<br />
server.ssl.key-store-type=PKCS12<br />
server.ssl.key-alias=tomcat<br />
</code>
