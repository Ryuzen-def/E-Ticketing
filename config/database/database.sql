-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 16, 2025 at 01:26 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e-ticketing`
--

-- --------------------------------------------------------

--
-- Table structure for table `ms_airport`
--

CREATE TABLE `ms_airport` (
  `airport_code` char(10) NOT NULL,
  `airport_detail` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ms_airport`
--

INSERT INTO `ms_airport` (`airport_code`, `airport_detail`, `country`, `city`) VALUES
('AMQ', 'Pattimura', 'Indonesia', 'Maluku'),
('BPN', 'Sepinggan', 'Indonesia', 'Kalimantan Timur'),
('BTJ', 'Sultan Iskandar Muda', 'Indonesia', 'Aceh'),
('CGK', 'Internasional Soekarno-Hatta', 'Indonesia', 'Jakarta'),
('DJJ', 'Sentani', 'Indonesia', 'Papua'),
('DPS', 'I Gusti Ngurah Rai', 'Indonesia', 'Bali'),
('MDC', 'Sam Ratulangi', 'Indonesia', 'Sulawesi Utara'),
('MES', 'Polonia', 'Indonesia', 'Sumatera Utara'),
('PNK', 'Supadio', 'Indonesia', 'Kalimantan Barat'),
('UPG', 'Sultan Hasanuddin', 'Indonesia', 'Sulawesi Selatan');

-- --------------------------------------------------------

--
-- Table structure for table `ms_order`
--

CREATE TABLE `ms_order` (
  `order_id` int NOT NULL,
  `id_user` varchar(255) DEFAULT NULL,
  `ticket_id` int DEFAULT NULL,
  `passenger_name` varchar(255) DEFAULT NULL,
  `seat_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `grand_total` int DEFAULT NULL,
  `order_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_pesawat`
--

CREATE TABLE `ms_pesawat` (
  `id_pesawat` varchar(255) NOT NULL,
  `nama_pesawat` varchar(255) DEFAULT NULL,
  `seri_pesawat` varchar(255) DEFAULT NULL,
  `isAvailable` char(1) DEFAULT NULL,
  `owner` varchar(255) DEFAULT NULL,
  `maxSeat` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ms_pesawat`
--

INSERT INTO `ms_pesawat` (`id_pesawat`, `nama_pesawat`, `seri_pesawat`, `isAvailable`, `owner`, `maxSeat`) VALUES
('GA', 'Garuda Indonesia', NULL, 'Y', 'Trans Airways', 250),
('ID', 'Batik Air', NULL, 'Y', 'Lion Mentari Airlines', 250),
('JT', 'Lion Air\r\n', NULL, 'Y', 'Lion Mentari Airlines', 250),
('QG', 'Citilink', NULL, 'Y', 'Citilink Indonesia', 250),
('QZ', 'Indonesia AirAsia', NULL, 'Y', 'DRB-HICOM\r\n', 250);

-- --------------------------------------------------------

--
-- Table structure for table `ms_route`
--

CREATE TABLE `ms_route` (
  `route_id` int NOT NULL,
  `airport_code_origin` char(10) DEFAULT NULL,
  `airport_code_destination` char(10) DEFAULT NULL,
  `distance_KM` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ms_route`
--

INSERT INTO `ms_route` (`route_id`, `airport_code_origin`, `airport_code_destination`, `distance_KM`) VALUES
(1, 'AMQ', 'CGK', 2392),
(2, 'CGK', 'MES', 1.378),
(3, 'AMQ', 'BTJ', 1800),
(4, 'AMQ', 'DJJ', 315),
(5, 'AMQ', 'DPS', 2965),
(6, 'AMQ', 'MDC', 1350),
(7, 'AMQ', 'MES', 2210),
(8, 'AMQ', 'PNK', 1435),
(9, 'AMQ', 'UPG', 2235),
(10, 'BPN', 'BTJ', 580),
(11, 'BPN', 'DJJ', 2610),
(12, 'BPN', 'DPS', 1545),
(13, 'BPN', 'MDC', 1615),
(14, 'BPN', 'MES', 1730),
(15, 'BPN', 'PNK', 160),
(16, 'BPN', 'UPG', 1255),
(17, 'BTJ', 'DJJ', 1545),
(18, 'BTJ', 'DPS', 2150),
(19, 'BTJ', 'MDC', 2440),
(20, 'BTJ', 'MES', 2660),
(21, 'BTJ', 'PNK', 2125),
(22, 'BTJ', 'UPG', 2320),
(23, 'DJJ', 'DPS', 2045),
(24, 'DJJ', 'MDC', 2150),
(25, 'DJJ', 'MES', 3285),
(26, 'DJJ', 'PNK', 2900),
(27, 'DJJ', 'UPG', 3275),
(28, 'DPS', 'MDC', 1550),
(29, 'DPS', 'MES', 2955),
(30, 'DPS', 'PNK', 2150),
(31, 'DPS', 'UPG', 1880),
(32, 'MDC', 'MES', 460),
(33, 'MDC', 'PNK', 1105),
(34, 'MDC', 'UPG', 1600),
(35, 'MES', 'PNK', 1065),
(36, 'MES', 'UPG', 1315),
(37, 'PNK', 'UPG', 1220),
(38, 'AMQ', 'CGK', 2585),
(39, 'BPN', 'CGK', 1160),
(40, 'BTJ', 'CGK', 1265),
(41, 'DJJ', 'CGK', 3135),
(42, 'DPS', 'CGK', 990),
(43, 'MDC', 'CGK', 2110),
(44, 'MES', 'CGK', 1775),
(45, 'PNK', 'CGK', 1190),
(46, 'UPG', 'CGK', 1455);

-- --------------------------------------------------------

--
-- Table structure for table `ms_ticket`
--

CREATE TABLE `ms_ticket` (
  `ticket_id` int NOT NULL,
  `route_id` int DEFAULT NULL,
  `id_pesawat` varchar(255) DEFAULT NULL,
  `take_off` datetime DEFAULT NULL,
  `arrival` datetime DEFAULT NULL,
  `class` varchar(25) DEFAULT NULL,
  `price` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ms_ticket`
--

INSERT INTO `ms_ticket` (`ticket_id`, `route_id`, `id_pesawat`, `take_off`, `arrival`, `class`, `price`) VALUES
(250100001, 44, 'GA', '2025-01-31 13:00:00', '2025-01-31 23:00:00', 'First', 12000000),
(250100002, 2, 'JT', '2025-01-30 14:42:00', '2025-01-31 00:42:00', 'First', 12000000),
(250100003, 9, 'QG', '2025-01-24 16:09:00', '2025-01-25 03:09:00', 'Business', 6420000),
(250100004, 5, 'GA', '2025-01-27 08:19:00', '2025-01-27 18:21:00', 'Premium', 3298000),
(250100005, 39, 'GA', '2025-01-24 09:08:00', '2025-01-24 15:08:00', 'Economy', 700000),
(250100006, 3, 'GA', '2025-01-29 15:13:00', '2025-01-30 00:13:00', 'Premium', 905000);

-- --------------------------------------------------------

--
-- Table structure for table `ms_user`
--

CREATE TABLE `ms_user` (
  `id_user` varchar(255) NOT NULL,
  `FullName` varchar(255) DEFAULT NULL,
  `password` text,
  `contact_number` varchar(14) DEFAULT NULL,
  `contact_email` varchar(255) DEFAULT NULL,
  `isVerified` char(1) DEFAULT NULL,
  `passport_id` varchar(255) DEFAULT NULL,
  `passport_country` varchar(255) DEFAULT NULL,
  `isAdmin` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ms_user`
--

INSERT INTO `ms_user` (`id_user`, `FullName`, `password`, `contact_number`, `contact_email`, `isVerified`, `passport_id`, `passport_country`, `isAdmin`) VALUES
('ADMIN1', 'Super Admin', '$2b$10$/uA/.7l6bc75v./PekOTKuKMlSkAt37BEoN8X.c7RCuivi3Jo/PaW', NULL, NULL, 'Y', NULL, NULL, 'Y'),
('Amru', 'Ambu Abdul Yajit', '$2b$10$YfoL3.e0YDNgriQqNQ6iqO7rwEFkq.q.hWmz1CvABM3eGGiZ3xpr.', '12383457', 'mrux@mail.com', NULL, '2332', NULL, NULL),
('Azhriel', 'Mufid Nur Tamam', '$2b$10$J91nuFazwMWcJkcFeYfNYOweDpAst4.eueSCVmE5WzOZ9ftkFi6t2', '123456789', 'mufidnt06@gmail.com', NULL, '123', NULL, NULL),
('Han', 'HanHan', '$2b$10$EzwwDW2pwSt.FzvLSDGAsuEkJjZ.zeY932gzdEf62eMZUqLfCwE8q', '123', 'M@M', NULL, '1', NULL, 'N'),
('Rofoi', 'Asurofi', '$2b$10$v/kym651JfzgPiT7ptbOKO8bS6X3yU4J7kb8aHIXC3qC90BkoESJi', '234170', 'r@mail.com', NULL, '8964120', NULL, NULL),
('user', 'user', '$2b$10$OxgV.DJ1HlKCAMJ7jrKNPepCtjRTs91BNHZsrIUP.d0K26WtuqFIG', '123', 'user@a', NULL, '123123', NULL, 'N');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `transaction_id` int NOT NULL,
  `order_id` int DEFAULT NULL,
  `id_user` varchar(255) DEFAULT NULL,
  `ticket_id` int DEFAULT NULL,
  `transaction_code` varchar(255) DEFAULT NULL,
  `grand_total` int DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `proof` varchar(255) DEFAULT NULL,
  `isPaid` char(1) DEFAULT NULL,
  `isCanceled` char(1) DEFAULT NULL,
  `transaction_date` datetime DEFAULT NULL,
  `isConfirmed` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ms_airport`
--
ALTER TABLE `ms_airport`
  ADD PRIMARY KEY (`airport_code`);

--
-- Indexes for table `ms_order`
--
ALTER TABLE `ms_order`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `ticket_id` (`ticket_id`);

--
-- Indexes for table `ms_pesawat`
--
ALTER TABLE `ms_pesawat`
  ADD PRIMARY KEY (`id_pesawat`);

--
-- Indexes for table `ms_route`
--
ALTER TABLE `ms_route`
  ADD PRIMARY KEY (`route_id`),
  ADD KEY `airport_code_origin` (`airport_code_origin`),
  ADD KEY `airport_code_destination` (`airport_code_destination`);

--
-- Indexes for table `ms_ticket`
--
ALTER TABLE `ms_ticket`
  ADD PRIMARY KEY (`ticket_id`),
  ADD KEY `route_id` (`route_id`),
  ADD KEY `id_pesawat` (`id_pesawat`);

--
-- Indexes for table `ms_user`
--
ALTER TABLE `ms_user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `passport_id` (`passport_id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `ticket_id` (`ticket_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ms_order`
--
ALTER TABLE `ms_order`
  ADD CONSTRAINT `ms_order_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `ms_user` (`id_user`),
  ADD CONSTRAINT `ms_order_ibfk_2` FOREIGN KEY (`ticket_id`) REFERENCES `ms_ticket` (`ticket_id`);

--
-- Constraints for table `ms_route`
--
ALTER TABLE `ms_route`
  ADD CONSTRAINT `ms_route_ibfk_1` FOREIGN KEY (`airport_code_origin`) REFERENCES `ms_airport` (`airport_code`),
  ADD CONSTRAINT `ms_route_ibfk_2` FOREIGN KEY (`airport_code_destination`) REFERENCES `ms_airport` (`airport_code`);

--
-- Constraints for table `ms_ticket`
--
ALTER TABLE `ms_ticket`
  ADD CONSTRAINT `ms_ticket_ibfk_1` FOREIGN KEY (`route_id`) REFERENCES `ms_route` (`route_id`),
  ADD CONSTRAINT `ms_ticket_ibfk_2` FOREIGN KEY (`id_pesawat`) REFERENCES `ms_pesawat` (`id_pesawat`);

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `ms_user` (`id_user`),
  ADD CONSTRAINT `transaction_ibfk_2` FOREIGN KEY (`ticket_id`) REFERENCES `ms_ticket` (`ticket_id`),
  ADD CONSTRAINT `transaction_ibfk_3` FOREIGN KEY (`order_id`) REFERENCES `ms_order` (`order_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
