Luggage Calculator
------------------

Install
-------

<p><b>Install Git</b></p>
<p>git clone https://github.com/CharlieSwires/payara-test</p>
<p><b>Install Maven</b></p>
<p><b>Install Docker</b></p>
<p>mvn clean package</p>
<p>docker build -t luggage-calculator-app .</p>
<p>docker run -p 9999:9999 luggage-calculator-app</p>


browser
-------
<p>http://localhost:9999/payara</p>


RESTful
-------

<p>GET http://localhost:9999/payara/luggage-calculator/rules</p>
<p>POST http://localhost:9999/payara/luggage-calculator/min-cost</p>
<p>POST http://localhost:9999/payara/luggage-calculator/cost</p>


