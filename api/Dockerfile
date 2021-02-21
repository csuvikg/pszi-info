FROM openjdk:15-jdk-alpine

RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

COPY build/libs/app.jar /app/

RUN ls /app

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
