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


Future
------

<p>To do all the requirements I would need a dual screen app the first screen having the 5x 
people with their weights. Next to the weights would be a submit button which would
take you to the screen I've done. A random number would be  generated for the passenger and all their luggage which could be used on a luggage label once the luggage has been paid for.
This random number if this app was running in many places would need a unique ID for the 
check-in desk adding to it to make th Label ID truly unique.</p>
<p>I haven't Dockerised it, if I were to do that jar -> war and use a tomcat container. </p>
