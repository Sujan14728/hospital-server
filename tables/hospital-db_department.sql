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
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nepali` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'Emergency Updated','emergency-updated',NULL,NULL,NULL),(2,'Outpatient','outpatient',NULL,NULL,NULL),(3,'Intensive Care Unit','intensive-care-unit',NULL,NULL,NULL),(4,'Surgical Department','surgical-department',NULL,NULL,NULL),(5,'Pediatrics Ward','pediatrics-ward',NULL,NULL,NULL),(7,'Test','test',NULL,NULL,NULL),(8,'Orthopedics','orthopedics','<h2>Orthopedics</h2><p>Orthopedics is the branch of medicine focused on the diagnosis, treatment, and prevention of disorders affecting the <strong>musculoskeletal system</strong>, including bones, joints, ligaments, tendons, and muscles.</p><p>Our orthopedic specialists provide comprehensive care for conditions such as:</p><ul><li>Fractures and bone injuries</li><li>Arthritis and joint pain</li><li>Sports injuries</li><li>Spinal disorders</li>  <li>Congenital musculoskeletal conditions</li></ul><p>Using advanced surgical and non-surgical treatments, we aim to restore mobility, reduce pain, and improve the quality of life for our patients.</p>','https://ssimsb.ac.in/public//uploads/course/1655211147.jpg','हाड जोर्नी'),(9,'Cardiology','cardiology','<h2>Cardiology</h2><p>Cardiology is the medical specialty dedicated to diagnosing and treating disorders of the <strong>heart and blood vessels</strong>. Our cardiology department offers expert care for conditions such as:</p><ul><li>Coronary artery disease</li><li>Heart rhythm disorders (arrhythmias)</li><li>Heart failure</li><li>High blood pressure (hypertension)</li><li>Congenital heart defects</li></ul><p>We utilize advanced diagnostic tools and innovative treatments to improve heart health and patient outcomes.</p>',NULL,NULL),(10,'Neurology','neurology','<h2>Neurology</h2><p>Neurology focuses on disorders of the <strong>nervous system</strong>, including the brain, spinal cord, and nerves. Our neurology department provides comprehensive care for:</p><ul><li>Stroke</li><li>Epilepsy</li><li>Multiple sclerosis</li><li>Parkinson\'s disease</li><li>Neuropathies</li></ul><p>We combine advanced diagnostics with personalized treatment plans to enhance patient quality of life.</p>','https://vshhospital.com/media/departments/Nurology.jpg',NULL),(11,'Pediatrics','pediatrics','<h2>Pediatrics</h2><p>The Pediatrics department provides compassionate care for infants, children, and adolescents. Our services include:</p><ul><li>Newborn and infant care</li><li>Vaccinations and immunizations</li><li>Growth and development monitoring</li><li>Treatment of common childhood illnesses</li><li>Pediatric specialty consultations</li></ul><p>We focus on ensuring the physical and emotional well-being of every child.</p>','https://www.diginerve.com/blogs/wp-content/uploads/2022/12/Important-Topics-to-Master-Pediatrics-in-PG.webp','बाल रोग');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
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
