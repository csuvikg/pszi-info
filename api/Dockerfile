FROM gradle:jre15-openj9 AS builder

WORKDIR /home/gradle/project

COPY . .

RUN gradle bootJar

FROM openjdk:15-jdk-alpine

RUN addgroup -S spring && adduser -S spring -G spring

USER spring:spring

WORKDIR /app

COPY --from=builder --chown=spring:spring /home/gradle/project/build/libs/app.jar ./

ENTRYPOINT ["java", "-jar", "app.jar"]
