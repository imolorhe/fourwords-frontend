name := """fourwords-frontend"""
organization := "com.xkojimedia"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.12.2"

libraryDependencies += guice
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "3.1.0" % Test
libraryDependencies += jdbc
libraryDependencies += "mysql" % "mysql-connector-java" % "6.0.6"

// https://mvnrepository.com/artifact/com.typesafe.play/play-slick_2.12
libraryDependencies += "com.typesafe.play" % "play-slick_2.12" % "3.0.1"

// https://mvnrepository.com/artifact/com.typesafe.play/play-slick-evolutions_2.11
//libraryDependencies += "com.typesafe.play" % "play-slick-evolutions_2.11" % "3.0.1"


// Adds additional packages into Twirl
//TwirlKeys.templateImports += "com.xkojimedia.controllers._"

// Adds additional packages into conf/routes
// play.sbt.routes.RoutesKeys.routesImport += "com.xkojimedia.binders._"
