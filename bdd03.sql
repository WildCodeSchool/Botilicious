-- MySQL dump 10.13  Distrib 5.7.20, for Linux (x86_64)
--
-- Host: localhost    Database: bot_dev
-- ------------------------------------------------------
-- Server version	5.7.20-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `bot_dev`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `bot_dev` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `bot_dev`;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `SequelizeMeta_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20171116152049-create-keywords.js'),('20171116152054-create-module.js'),('20171116152151-create-categories.js'),('20171116152235-create-sentences.js'),('20171121171631-create-user.js'),('20171121171632-create-chatbot.js'),('20171121171633-create-chatbot-has-module.js'),('20171121171634-create-keyword-has-module.js'),('20171121171635-create-sentence-has-module.js'),('20171121171636-create-category-has-module.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_has_module`
--

DROP TABLE IF EXISTS `category_has_module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category_has_module` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryId` int(11) DEFAULT NULL,
  `moduleId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  KEY `moduleId` (`moduleId`),
  CONSTRAINT `category_has_module_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`),
  CONSTRAINT `category_has_module_ibfk_2` FOREIGN KEY (`moduleId`) REFERENCES `modules` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_has_module`
--

LOCK TABLES `category_has_module` WRITE;
/*!40000 ALTER TABLE `category_has_module` DISABLE KEYS */;
/*!40000 ALTER TABLE `category_has_module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chatbot_has_module`
--

DROP TABLE IF EXISTS `chatbot_has_module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chatbot_has_module` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chatbotId` int(11) DEFAULT NULL,
  `moduleId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `chatbotId` (`chatbotId`),
  KEY `moduleId` (`moduleId`),
  CONSTRAINT `chatbot_has_module_ibfk_1` FOREIGN KEY (`chatbotId`) REFERENCES `chatbots` (`id`),
  CONSTRAINT `chatbot_has_module_ibfk_2` FOREIGN KEY (`moduleId`) REFERENCES `modules` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chatbot_has_module`
--

LOCK TABLES `chatbot_has_module` WRITE;
/*!40000 ALTER TABLE `chatbot_has_module` DISABLE KEYS */;
/*!40000 ALTER TABLE `chatbot_has_module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chatbots`
--

DROP TABLE IF EXISTS `chatbots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chatbots` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `chatbots_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chatbots`
--

LOCK TABLES `chatbots` WRITE;
/*!40000 ALTER TABLE `chatbots` DISABLE KEYS */;
/*!40000 ALTER TABLE `chatbots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `keyword_has_module`
--

DROP TABLE IF EXISTS `keyword_has_module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `keyword_has_module` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `keywordId` int(11) DEFAULT NULL,
  `moduleId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `keywordId` (`keywordId`),
  KEY `moduleId` (`moduleId`),
  CONSTRAINT `keyword_has_module_ibfk_1` FOREIGN KEY (`keywordId`) REFERENCES `keywords` (`id`),
  CONSTRAINT `keyword_has_module_ibfk_2` FOREIGN KEY (`moduleId`) REFERENCES `modules` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keyword_has_module`
--

LOCK TABLES `keyword_has_module` WRITE;
/*!40000 ALTER TABLE `keyword_has_module` DISABLE KEYS */;
/*!40000 ALTER TABLE `keyword_has_module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `keywords`
--

DROP TABLE IF EXISTS `keywords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `keywords` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keywords`
--

LOCK TABLES `keywords` WRITE;
/*!40000 ALTER TABLE `keywords` DISABLE KEYS */;
/*!40000 ALTER TABLE `keywords` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modules`
--

DROP TABLE IF EXISTS `modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `modules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text,
  `description` text,
  `apiurl` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modules`
--

LOCK TABLES `modules` WRITE;
/*!40000 ALTER TABLE `modules` DISABLE KEYS */;
/*!40000 ALTER TABLE `modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sentence_has_module`
--

DROP TABLE IF EXISTS `sentence_has_module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sentence_has_module` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sentenceId` int(11) DEFAULT NULL,
  `moduleId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sentenceId` (`sentenceId`),
  KEY `moduleId` (`moduleId`),
  CONSTRAINT `sentence_has_module_ibfk_1` FOREIGN KEY (`sentenceId`) REFERENCES `sentences` (`id`),
  CONSTRAINT `sentence_has_module_ibfk_2` FOREIGN KEY (`moduleId`) REFERENCES `modules` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sentence_has_module`
--

LOCK TABLES `sentence_has_module` WRITE;
/*!40000 ALTER TABLE `sentence_has_module` DISABLE KEYS */;
/*!40000 ALTER TABLE `sentence_has_module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sentences`
--

DROP TABLE IF EXISTS `sentences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sentences` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` text,
  `type` enum('Q','A') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sentences`
--

LOCK TABLES `sentences` WRITE;
/*!40000 ALTER TABLE `sentences` DISABLE KEYS */;
/*!40000 ALTER TABLE `sentences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `dateofbirth` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `zipcode` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-22 15:19:52
