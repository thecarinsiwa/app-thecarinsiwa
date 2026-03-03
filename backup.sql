-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: carin_portfolio
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_otps`
--

DROP TABLE IF EXISTS `admin_otps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_otps` (
  `id` varchar(36) NOT NULL,
  `token` varchar(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `otp` varchar(6) NOT NULL,
  `expiresAt` datetime NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_47e957256adcde329e200d8260` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_otps`
--

LOCK TABLES `admin_otps` WRITE;
/*!40000 ALTER TABLE `admin_otps` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin_otps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_messages`
--

DROP TABLE IF EXISTS `contact_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_messages` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_messages`
--

LOCK TABLES `contact_messages` WRITE;
/*!40000 ALTER TABLE `contact_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `contact_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `designs`
--

DROP TABLE IF EXISTS `designs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `designs` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `imageUrl` varchar(2000) NOT NULL,
  `category` varchar(50) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `designs`
--

LOCK TABLES `designs` WRITE;
/*!40000 ALTER TABLE `designs` DISABLE KEYS */;
INSERT INTO `designs` VALUES ('9b812391-1efd-488f-95f9-f78fa472c743','Ending Year Tour of Uganda','http://localhost:3001/uploads/designs/1772403939563-h3g8xz74.jpg','Social Media','2026-03-02 00:25:52.629941','2026-03-02 00:25:52.629941');
/*!40000 ALTER TABLE `designs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `techStack` text NOT NULL,
  `githubUrl` varchar(500) DEFAULT NULL,
  `liveUrl` varchar(500) DEFAULT NULL,
  `featured` tinyint NOT NULL DEFAULT '0',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES ('93ad4804-e205-4de3-8706-ab78837b35fa','Mkulima Chain','Gestion commerciale','http://localhost:3001/uploads/projects/1772404294003-rfj7vzsx.png','[\"Next.js\",\"NestJS\",\"PostgreSQL\",\"Web3\",\"Cardano\",\"Haskell\"]','https://github.com/Mkulima-chain/app-mkulimachain','https://mkulimachain.com',1,'2026-03-02 00:34:04.809114','2026-03-02 00:39:25.000000');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `site_settings`
--

DROP TABLE IF EXISTS `site_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `site_settings` (
  `id` varchar(255) NOT NULL DEFAULT 'main',
  `socialLinks` text NOT NULL,
  `contactSubtitle` varchar(500) DEFAULT NULL,
  `contactEmail` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `site_settings`
--

LOCK TABLES `site_settings` WRITE;
/*!40000 ALTER TABLE `site_settings` DISABLE KEYS */;
INSERT INTO `site_settings` VALUES ('main','[{\"label\":\"Github\",\"href\":\"https://github.com/thecarinsiwa\"},{\"label\":\"LinkedIn\",\"href\":\"https://www.linkedin.com/in/siwacarin-cd/\"},{\"label\":\"Instagram\",\"href\":\"https://www.instagram.com/siwacarin_cd/\"},{\"label\":\"X\",\"href\":\"https://x.com/siwacarin_cd\"},{\"label\":\"Facebook\",\"href\":\"https://web.facebook.com/carinsiwa.young/\"},{\"label\":\"Youtube\",\"href\":\"https://www.youtube.com/@siwacarin_cd\"}]',NULL,NULL);
/*!40000 ALTER TABLE `site_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wildlife_photos`
--

DROP TABLE IF EXISTS `wildlife_photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wildlife_photos` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `imageUrl` varchar(2000) NOT NULL,
  `caption` varchar(500) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wildlife_photos`
--

LOCK TABLES `wildlife_photos` WRITE;
/*!40000 ALTER TABLE `wildlife_photos` DISABLE KEYS */;
INSERT INTO `wildlife_photos` VALUES ('bde89848-d644-4ee4-87eb-835d520bba40','Nyiragongo Top View','http://localhost:3001/uploads/wildlife/1772405205299-2spe9s8i.jpeg','nyiragongo 2020','2026-03-02 00:47:27.956734');
/*!40000 ALTER TABLE `wildlife_photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wildlife_videos`
--

DROP TABLE IF EXISTS `wildlife_videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wildlife_videos` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `embedUrl` varchar(2000) NOT NULL,
  `thumbnailUrl` varchar(500) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wildlife_videos`
--

LOCK TABLES `wildlife_videos` WRITE;
/*!40000 ALTER TABLE `wildlife_videos` DISABLE KEYS */;
INSERT INTO `wildlife_videos` VALUES ('a9631114-9fb9-421b-afe6-5542e64a7d0b','Virunga National Park to visit in 30 sec','https://www.youtube.com/watch?v=cRNDOo-7Tsw',NULL,'2026-03-02 00:49:16.994717');
/*!40000 ALTER TABLE `wildlife_videos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-03 12:26:37
