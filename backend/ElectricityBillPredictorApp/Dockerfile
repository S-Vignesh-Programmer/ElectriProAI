# Stage 1: Build with Maven and JDK
FROM maven:3.8.7-openjdk-17 AS build

WORKDIR /app

# Copy pom.xml and source code
COPY pom.xml .
COPY src ./src

# Build the project, skip tests to speed up build
RUN mvn clean install -DskipTests

# Stage 2: Run the app with lightweight OpenJDK
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy the jar built in previous stage
COPY --from=build /app/target/*.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run the Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]
