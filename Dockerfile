# Stage 1: Build the React app
FROM node:14 AS react-build
WORKDIR /app
# Copy the React app source code
COPY src/main/webapp/luggage-calculator-app/package*.json ./
RUN npm install
COPY src/main/webapp/luggage-calculator-app/ ./
RUN npm run build

# Stage 2: Build the Spring Boot app
FROM maven:3.8.7-eclipse-temurin-17 AS maven-build
WORKDIR /app
# Copy the pom.xml and download dependencies
COPY pom.xml ./
RUN mvn dependency:go-offline
# Copy the rest of the application source code
COPY src ./src
# Copy the React build artifacts into the static resources
COPY src/main/webapp/luggage-calculator-app/cert.pem /app/build/
COPY src/main/webapp/luggage-calculator-app/key.pem /app/build/
COPY --from=react-build /app/build/ ./src/main/resources/static/
# Package the application
RUN mvn clean package -DskipTests

# Stage 3: Run the Spring Boot app
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=maven-build /app/target/*.jar app.jar
EXPOSE 8443
ENTRYPOINT ["java", "-Xss8m", "-jar", "app.jar"]
