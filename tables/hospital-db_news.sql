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
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `image_url` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `source` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `like` int NOT NULL DEFAULT '0',
  `views` int NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (1,'Breaking News Title update','This is the description of the news article.updated','https://example.com/image.jpg','News Source',14,13,'2025-06-05 10:04:37','2025-06-05 10:24:08'),(2,'Putin will seek revenge for Ukraine drone attack, warns Trump','Vladimir Putin has said he will have to respond to Ukraine\'s major drone attack on Russian airbases, US President Donald Trump has warned. Speaking after a phone call with the Russian president, Trump said: \"President Putin did say, and very strongly, that he will have to respond to the recent attack on the airfields.\" Russian officials declined to confirm this on Wednesday night, but Moscow had earlier said that military options were \"on the table \" for its response. Trump warned in a social media post that the phone call, which lasted more than an hour, would not \"lead to immediate peace\" between Russia and Ukraine. Russia\'s RIA Novosti, a state-owned news agency, said Putin told Trump that Ukraine has tried to \"disrupt\" the negotiations and that the government in Kyiv has \"essentially turned into a terrorist organisation\". The two also exchanged views on the prospects for restoring cooperation between the countries, which has enormous potential,\" it said. The conversation between the two leaders marks the first since Ukraine launched a surprise attack using smuggled drones to strike Russian airbases on 1 June, targeting what it said were nuclear-capable long-range bombers. Trump told Putin in the call that the US was not warned in advance of the attack, Russian presidential aide Yury Ushakov said. Ukraine\'s Minister of Strategic Industries Yuriy Sak told Radio 4\'s World Tonight programme his country had hoped the US would respond to the \"incessant Russian missile and drone attacks\" with \"more sanctions and with more pressure\". Last week, Trump appeared to set a two-week deadline for Putin, threatening to change how the US is responding to Russia if he believed Putin was still \"tapping\" him along on peace efforts in Ukraine. The comment was one of a string of critical remarks by Trump, who on 26 May said that Putin had gone \"absolutely crazy\" and was \"playing with fire\" after Russia escalated drone and missile attacks on cities in Ukraine, killing dozens of civilians. Trump made no mention of a deadline or his previous remarks in Wednesday\'s post on his Truth Social platform. In a post on X, Ukrainian President Volodymyr Zelensky talked about the scale Russian attacks on his country since Moscow\'s full-scale invasion in 2022.\"Many have spoken with Russia at various levels. But none of these talks have brought a reliable peace, or even stopped the war,\" Zelensky wrote. \"If the world reacts weakly to Putin\'s threats, he interprets it as a readiness to turn a blind eye to his actions,\" he added.On Wednesday, a delegation of Ukrainian officials including Deputy Prime Minister Yulia Svyrydenko and Presidential Office head Andriy Yermak were set to meet with US senators in Washington to discuss arms purchases and efforts to stop the fighting.','https://ichef.bbci.co.uk/news/1536/cpsprodpb/c47f/live/0379b7a0-416b-11f0-88d8-8f3017cf2559.jpg.webp','https://www.bbc.com/news/articles/cx2r108l785o',0,0,'2025-06-05 10:11:04','2025-06-05 10:11:04'),(3,'Putin will seek revenge for Ukraine drone attack, warns Trump','Vladimir Putin has said he will have to respond to Ukraine\'s major drone attack on Russian airbases, US President Donald Trump has warned. Speaking after a phone call with the Russian president, Trump said: \"President Putin did say, and very strongly, that he will have to respond to the recent attack on the airfields.\" Russian officials declined to confirm this on Wednesday night, but Moscow had earlier said that military options were \"on the table \" for its response. Trump warned in a social media post that the phone call, which lasted more than an hour, would not \"lead to immediate peace\" between Russia and Ukraine. Russia\'s RIA Novosti, a state-owned news agency, said Putin told Trump that Ukraine has tried to \"disrupt\" the negotiations and that the government in Kyiv has \"essentially turned into a terrorist organisation\". The two also exchanged views on the prospects for restoring cooperation between the countries, which has enormous potential,\" it said. The conversation between the two leaders marks the first since Ukraine launched a surprise attack using smuggled drones to strike Russian airbases on 1 June, targeting what it said were nuclear-capable long-range bombers. Trump told Putin in the call that the US was not warned in advance of the attack, Russian presidential aide Yury Ushakov said. Ukraine\'s Minister of Strategic Industries Yuriy Sak told Radio 4\'s World Tonight programme his country had hoped the US would respond to the \"incessant Russian missile and drone attacks\" with \"more sanctions and with more pressure\". Last week, Trump appeared to set a two-week deadline for Putin, threatening to change how the US is responding to Russia if he believed Putin was still \"tapping\" him along on peace efforts in Ukraine. The comment was one of a string of critical remarks by Trump, who on 26 May said that Putin had gone \"absolutely crazy\" and was \"playing with fire\" after Russia escalated drone and missile attacks on cities in Ukraine, killing dozens of civilians. Trump made no mention of a deadline or his previous remarks in Wednesday\'s post on his Truth Social platform. In a post on X, Ukrainian President Volodymyr Zelensky talked about the scale Russian attacks on his country since Moscow\'s full-scale invasion in 2022.\"Many have spoken with Russia at various levels. But none of these talks have brought a reliable peace, or even stopped the war,\" Zelensky wrote. \"If the world reacts weakly to Putin\'s threats, he interprets it as a readiness to turn a blind eye to his actions,\" he added.On Wednesday, a delegation of Ukrainian officials including Deputy Prime Minister Yulia Svyrydenko and Presidential Office head Andriy Yermak were set to meet with US senators in Washington to discuss arms purchases and efforts to stop the fighting.','https://ichef.bbci.co.uk/news/1536/cpsprodpb/c47f/live/0379b7a0-416b-11f0-88d8-8f3017cf2559.jpg.webp','https://www.bbc.com/news/articles/cx2r108l785o',0,0,'2025-06-05 10:11:34','2025-06-05 10:11:34');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-09 15:39:47
