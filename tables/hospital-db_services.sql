-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: hospital-db
-- ------------------------------------------------------
-- Server version	8.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `summary` text,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `points` text,
  `icon` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'Energency and trauma care','energency-and-trauma-care','Routine medical examinations for overall health evaluation.','Energency and trauma care service provides a complete medical examination to assess your overall health. It includes blood pressure monitoring, cholesterol screening, BMI calculation, and basic blood work.','https://ik.imagekit.io/zotyjbh5j/New%20Folder/free_checkup.png?updatedAt=1748351881854','[\'A Passion for Healing\',\'5-Star Care\',\'A Legacy of Excellence\',\'Always Caring\']','stethoscope'),(2,'Pediatrics','pediatrics','Comprehensive healthcare for infants, children, and adolescents.','Our pediatricians are dedicated to the health and well-being of your children. From newborn checkups to developmental screenings, we ensure your child receives the best care.','https://ik.imagekit.io/zotyjbh5j/New%20Folder/pediatrics.webp?updatedAt=1748502576642','[\'Child-focused Approach\',\'Gentle & Safe Care\',\'Parental Guidance Support\']','baby'),(3,'Dental Care','dental-care','Oral health services including cleaning, fillings, and preventive care.','We offer professional dental services including oral exams, cleanings, x-rays, fillings, and fluoride treatments. Our team is committed to helping you maintain a healthy smile.','https://ik.imagekit.io/zotyjbh5j/New%20Folder/free_checkup.png?updatedAt=1748351881854','[\'A Passion for Healing\',\'5-Star Care\',\'A Legacy of Excellence\',\'Always Caring\']','tooth'),(4,'Cardiology','cardiology','Diagnosis and treatment of heart-related conditions.','Our cardiology department provides advanced diagnostics, treatment, and monitoring for a wide range of cardiovascular conditions. Services include EKG, echocardiograms, and stress tests.','https://ik.imagekit.io/zotyjbh5j/New%20Folder/free_checkup.png?updatedAt=1748351881854','[\'A Passion for Healing\',\'5-Star Care\',\'A Legacy of Excellence\',\'Always Caring\']','heartbeat');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-10 17:40:58
