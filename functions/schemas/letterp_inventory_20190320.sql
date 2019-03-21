-- MySQL dump 10.16  Distrib 10.2.14-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: letterp_inventory
-- ------------------------------------------------------
-- Server version	10.2.14-MariaDB

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_code` varchar(20) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT 1,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_id_uindex` (`id`),
  UNIQUE KEY `categories_category_code_uindex` (`category_code`),
  UNIQUE KEY `categories_category_name_uindex` (`category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
INSERT INTO `categories` (`id`, `category_code`, `category_name`, `createdAt`, `updatedAt`, `enabled`, `userId`) VALUES (1,'SALE','Salable','2019-03-19 08:17:01','2019-03-19 08:17:02',1,NULL),(2,'MATERIAL','Material','2019-03-19 15:17:26','2019-03-19 08:17:23',1,NULL);
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_code` varchar(20) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `established_date` date NOT NULL,
  `contactId` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT 1,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `companies_id_uindex` (`id`),
  UNIQUE KEY `companies_company_name_uindex` (`company_name`),
  UNIQUE KEY `companies_company_code_uindex` (`company_code`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
INSERT INTO `companies` (`id`, `company_code`, `company_name`, `address`, `established_date`, `contactId`, `createdAt`, `updatedAt`, `enabled`, `userId`) VALUES (1,'LETTER-P','Letter-p Restaurant','1st Dongdok rd Xaythany District Vientiane Laos','2019-01-07',1,'2019-03-20 08:19:33','2019-03-20 01:19:08',1,0);
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gender` char(1) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `tel` varchar(20) NOT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `contact_card` varchar(255) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `photo` varchar(500) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `contacts_id_uindex` (`id`),
  UNIQUE KEY `contacts_fullname_uindex` (`fullname`),
  UNIQUE KEY `contacts_email_uindex` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
INSERT INTO `contacts` (`id`, `gender`, `fullname`, `address`, `tel`, `mobile`, `email`, `contact_card`, `updatedAt`, `createdAt`, `photo`, `userId`) VALUES (1,'M','soulisack SAYYALINH','1st dongdok rd Xaythanee district Vientiane Lao PDR','0305123456','02055588857','sayyalinh@gmail.com','',NULL,'2019-03-20 08:44:12',NULL,NULL);
UNLOCK TABLES;

--
-- Table structure for table `currencies`
--

DROP TABLE IF EXISTS `currencies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `currencies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `currency_code` varchar(3) NOT NULL,
  `currency_name` varchar(20) NOT NULL,
  `is_primary` tinyint(1) DEFAULT 0,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT 1,
  `rate` float NOT NULL DEFAULT 0,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `currencies_id_uindex` (`id`),
  UNIQUE KEY `currencies_currency_code_uindex` (`currency_code`),
  UNIQUE KEY `currencies_currency_name_uindex` (`currency_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `currencies`
--

LOCK TABLES `currencies` WRITE;
INSERT INTO `currencies` (`id`, `currency_code`, `currency_name`, `is_primary`, `createdAt`, `updatedAt`, `enabled`, `rate`, `userId`) VALUES (1,'840','USD',0,'2019-03-19 07:59:44','2019-03-19 07:59:45',1,0.00012,NULL),(2,'418','LAK',1,'2019-03-19 14:59:58','2019-03-19 07:59:55',1,1,NULL),(3,'764','THB',0,'2019-03-19 15:06:12','2019-03-19 08:06:10',1,0.0037,NULL);
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `location_code` varchar(20) NOT NULL,
  `location_name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT 1,
  `contactId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `locations_id_uindex` (`id`),
  UNIQUE KEY `locations_location_name_uindex` (`location_name`),
  UNIQUE KEY `locations_location_code_uindex` (`location_code`),
  UNIQUE KEY `locations_address_uindex` (`address`),
  KEY `locations_contact_fk` (`contactId`),
  CONSTRAINT `locations_contact_fk` FOREIGN KEY (`contactId`) REFERENCES `contacts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
INSERT INTO `locations` (`id`, `location_code`, `location_name`, `address`, `createdAt`, `updatedAt`, `enabled`, `contactId`, `userId`) VALUES (2,'DD-01','Letter-p Dongdok','1st dongdok rd Xaythanee district Vientiane Lao PDR','2019-03-19 07:54:25','2019-03-19 07:54:27',1,1,NULL);
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_code` varchar(20) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_description` varchar(255) DEFAULT NULL,
  `cost` double NOT NULL DEFAULT 0,
  `price` double NOT NULL DEFAULT 0,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `currencyId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `supplierId` int(11) NOT NULL,
  `unitId` int(11) NOT NULL,
  `expireDate` date NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `products_id_uindex` (`id`),
  UNIQUE KEY `products_product_code_uindex` (`product_code`),
  UNIQUE KEY `products_product_name_uindex` (`product_name`),
  KEY `products_category_fk` (`categoryId`),
  KEY `products_supplier_fk` (`supplierId`),
  KEY `products_currency_fk` (`currencyId`),
  KEY `products_unit_fk` (`unitId`),
  CONSTRAINT `products_category_fk` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_currency_fk` FOREIGN KEY (`currencyId`) REFERENCES `currencies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_supplier_fk` FOREIGN KEY (`supplierId`) REFERENCES `suppliers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_unit_fk` FOREIGN KEY (`unitId`) REFERENCES `units` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
INSERT INTO `products` (`id`, `product_code`, `product_name`, `product_description`, `cost`, `price`, `quantity`, `currencyId`, `categoryId`, `supplierId`, `unitId`, `expireDate`, `createdAt`, `updatedAt`, `userId`) VALUES (4,'pepsi','Pepsi','Pepsi can 450 ml',3000,8000,450,2,1,1,3,'2020-12-31','2019-03-20 15:23:08','2019-03-20 15:30:49',3);
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_code` varchar(10) NOT NULL,
  `role_name` varchar(255) NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_id_uindex` (`id`),
  UNIQUE KEY `roles_role_code_uindex` (`role_code`),
  UNIQUE KEY `roles_role_name_uindex` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
INSERT INTO `roles` (`id`, `role_code`, `role_name`, `enabled`, `createdAt`, `updatedAt`) VALUES (1,'ADMIN','administrator',1,'2019-03-20 13:25:49','2019-03-20 06:25:47');
UNLOCK TABLES;

--
-- Table structure for table `sources`
--

DROP TABLE IF EXISTS `sources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sources` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `module_name` varchar(255) NOT NULL,
  `enabled` tinyint(1) DEFAULT 1,
  `userId` int(11) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `sources_id_uindex` (`id`),
  UNIQUE KEY `sources_module_name_uindex` (`module_name`),
  KEY `sources_user_fk` (`userId`),
  CONSTRAINT `sources_user_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sources`
--

LOCK TABLES `sources` WRITE;
INSERT INTO `sources` (`id`, `module_name`, `enabled`, `userId`, `createdAt`, `updatedAt`) VALUES (1,'purchases',1,3,'2019-03-20 16:33:47','2019-03-20 16:33:47'),(2,'orders',1,3,'2019-03-20 16:34:13','2019-03-20 16:34:13'),(3,'staff',1,3,'2019-03-20 16:34:26','2019-03-20 16:34:26');
UNLOCK TABLES;

--
-- Table structure for table `stocks`
--

DROP TABLE IF EXISTS `stocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stocks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stock_refno` varchar(12) NOT NULL,
  `productId` int(11) NOT NULL,
  `previous_quantity` int(11) DEFAULT NULL,
  `used_quantity` int(11) DEFAULT NULL,
  `current_quantity` int(11) NOT NULL DEFAULT 0,
  `minimum_quantity` int(11) NOT NULL DEFAULT 0,
  `remarks` varchar(255) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `stocks_id_uindex` (`id`),
  UNIQUE KEY `stocks_productId_uindex` (`productId`),
  UNIQUE KEY `stocks_stock_refno_uindex` (`stock_refno`),
  KEY `stocks_user_fk` (`userId`),
  CONSTRAINT `stocks_user_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stocks`
--

LOCK TABLES `stocks` WRITE;
INSERT INTO `stocks` (`id`, `stock_refno`, `productId`, `previous_quantity`, `used_quantity`, `current_quantity`, `minimum_quantity`, `remarks`, `userId`, `createdAt`, `updatedAt`) VALUES (8,'000000000522',4,0,0,900,450,'initialize stock',3,'2019-03-20 17:16:56','2019-03-20 17:16:55');
UNLOCK TABLES;

--
-- Table structure for table `stocktrackings`
--

DROP TABLE IF EXISTS `stocktrackings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stocktrackings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stockId` int(11) NOT NULL,
  `sourceId` int(11) NOT NULL,
  `previous_quantity` int(11) NOT NULL,
  `used_quantity` int(11) NOT NULL,
  `current_quantity` int(11) NOT NULL,
  `remarks` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `stocktrackings_id_uindex` (`id`),
  KEY `stocktrackings_user_fk` (`userId`),
  KEY `stocktrackings_source_fk` (`sourceId`),
  CONSTRAINT `stocktrackings_source_fk` FOREIGN KEY (`sourceId`) REFERENCES `sources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `stocktrackings_user_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stocktrackings`
--

LOCK TABLES `stocktrackings` WRITE;
INSERT INTO `stocktrackings` (`id`, `stockId`, `sourceId`, `previous_quantity`, `used_quantity`, `current_quantity`, `remarks`, `userId`, `createdAt`, `updatedAt`) VALUES (1,8,3,0,0,900,'Manual add Quantity',3,'2019-03-20 17:16:56','2019-03-20 17:16:56');
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `suppliers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `supplier_name` varchar(255) NOT NULL,
  `contactId` int(11) DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT 1,
  `createdAt` datetime DEFAULT current_timestamp(),
  `udpatedAt` datetime DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `suppliers_id_uindex` (`id`),
  UNIQUE KEY `suppliers_supplier_name_uindex` (`supplier_name`),
  KEY `suppliers_contact_fk` (`contactId`),
  CONSTRAINT `suppliers_contact_fk` FOREIGN KEY (`contactId`) REFERENCES `contacts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
INSERT INTO `suppliers` (`id`, `supplier_name`, `contactId`, `enabled`, `createdAt`, `udpatedAt`, `userId`) VALUES (1,'J-Mart',1,1,'2019-03-20 15:14:09','2019-03-20 08:14:04',3);
UNLOCK TABLES;

--
-- Table structure for table `units`
--

DROP TABLE IF EXISTS `units`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `units` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `unit_name` varchar(10) DEFAULT NULL,
  `unit` char(2) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT 1,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `units_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `units`
--

LOCK TABLES `units` WRITE;
INSERT INTO `units` (`id`, `unit_name`, `unit`, `createdAt`, `updatedAt`, `enabled`, `userId`) VALUES (1,'Gram','g','2019-03-19 14:20:29','2019-03-19 07:20:26',1,NULL),(2,'Kilo gram','kg','2019-03-19 14:21:10','2019-03-19 07:20:38',1,NULL),(3,'Milli lite','ml','2019-03-19 14:21:10','2019-03-19 07:20:55',1,NULL),(4,'Lite','l','2019-03-19 14:21:10','2019-03-19 07:21:08',1,NULL);
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_code` varchar(36) NOT NULL,
  `gender` char(1) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `dateOfbirth` date NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `employed_date` date NOT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `photo` varchar(2000) NOT NULL,
  `password` varchar(255) NOT NULL,
  `enabled` tinyint(1) DEFAULT 1,
  `roleId` int(11) NOT NULL,
  `firstlogin` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_id_uindex` (`id`),
  UNIQUE KEY `users_username_uindex` (`username`),
  UNIQUE KEY `users_fullname_uindex` (`fullname`),
  UNIQUE KEY `users_employee_code_uindex` (`employee_code`),
  KEY `users_role_fk` (`roleId`),
  CONSTRAINT `users_role_fk` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
INSERT INTO `users` (`id`, `employee_code`, `gender`, `username`, `dateOfbirth`, `fullname`, `employed_date`, `mobile`, `photo`, `password`, `enabled`, `roleId`, `firstlogin`, `createdAt`, `updatedAt`) VALUES (3,'e74e0a6d-57eb-4913-b9ff-810e9ed4a636','M','admin','1985-02-10','adminstrator','2019-03-20','02055588857','no available','$2b$10$9VvXEsBGQN75tM2Ve0YJyO/mQ2tboRqENoMSAHkgN2FnPpFvYvIYC',1,1,1,'2019-03-20 13:27:31','2019-03-20 13:27:31'),(7,'60098124-9fa6-4436-beec-64448761008c','M','staff-01','1985-02-10','staff-01','2019-03-20','02055588859','no available','$2b$10$jL/aFmx3Mf69tXkOtNBycOC/5qAfRPXBUSMps7DtTdgLLJNzMHQTC',1,1,1,'2019-03-20 14:59:43','2019-03-20 14:59:43');
UNLOCK TABLES;

--
-- Table structure for table `warehouses`
--

DROP TABLE IF EXISTS `warehouses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `warehouses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `locationId` int(11) NOT NULL,
  `warehouse_code` varchar(20) NOT NULL,
  `warehouse_name` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `warehouses_id_uindex` (`id`),
  UNIQUE KEY `warehouses_warehouse_code_uindex` (`warehouse_code`),
  KEY `warehouses_location_fk` (`locationId`),
  CONSTRAINT `warehouses_location_fk` FOREIGN KEY (`locationId`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouses`
--

LOCK TABLES `warehouses` WRITE;
INSERT INTO `warehouses` (`id`, `locationId`, `warehouse_code`, `warehouse_name`, `createdAt`, `updatedAt`, `userId`) VALUES (1,2,'DD-WH-01','Letter-p wh','2019-03-19 08:36:36','2019-03-19 08:36:38',NULL);
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-20 17:18:00
