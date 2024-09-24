Luggage Calculator
------------------

Install
-------

<p><b> Install Node.js and npm (if not already installed)</b></p>
<p><b> Download from https://nodejs.org/</b></p>

<p><b> Install Bootstrap 3</b></p>

<p>npm install bootstrap@3</p>

<p><b> Install Git, Maven and JDK17</b></p>

<p>in git bash</p>
<p>git clone https://github.com/CharlieSwires/payara-test</p>
<p>This contains both the java and React</p>

build
-----
<p>git bash 1</p>
<p>cd payara-test</p>
<p>mvn clean package</p>
<p>cd target</p>
<p>java -jar payara-test.jar</p>
<p>git bash 2</p>
<p>cd payara-test/src/main/webapp/luggage-calculator-app</p>
<p>npm start</p>


browser
-------
<p>http://localhost:3000/luggage-calculator-app</p>


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
