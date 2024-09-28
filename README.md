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
<p>docker run -p 8443:8443 luggage-calculator-app</p>


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


