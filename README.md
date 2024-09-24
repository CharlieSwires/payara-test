Luggage Calculator
------------------
<p>in git bash</p>
<p>git clone https://github.com/CharlieSwires/payara-test</p>
<p>This contains both the java and React</p>

Install
-------

# Install Node.js and npm (if not already installed)
# Download from https://nodejs.org/

# Create a new React application

<p>npx create-react-app luggage-calculator-app</p>
<p>cd luggage-calculator-app</p>

# Install Bootstrap 3

<p>npm install bootstrap@3</p>

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
take you to the screen I've done. A random number would be  generated for the passenger and all their luggage which could be used on a luggage label once the luggage has been paid for.</p>
