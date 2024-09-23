Luggage Calculator
------------------
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
