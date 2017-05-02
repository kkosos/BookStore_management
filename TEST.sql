-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 02, 2017 at 11:27 AM
-- Server version: 5.7.18-0ubuntu0.16.04.1
-- PHP Version: 7.0.15-0ubuntu0.16.04.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `TEST`
--

-- --------------------------------------------------------

--
-- Table structure for table `AB`
--

CREATE TABLE `AB` (
  `Book` varchar(256) NOT NULL,
  `Price` varchar(256) DEFAULT NULL,
  `Date` varchar(256) DEFAULT NULL,
  `Pub` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `AB`
--

INSERT INTO `AB` (`Book`, `Price`, `Date`, `Pub`) VALUES
('366nhmh', 'nbmhj,', 'yuyu', 'ghgh'),
('a', '12', '205/2', 'ghgh'),
('h', '+m+', 'n', 'g'),
('hg', '+ju+', 'ku', 'ki'),
('mm', '+nn+', 'bb', 'vv');

-- --------------------------------------------------------

--
-- Table structure for table `Book_Stock`
--

CREATE TABLE `Book_Stock` (
  `name` varchar(256) NOT NULL,
  `price` int(11) NOT NULL,
  `date` varchar(256) NOT NULL,
  `publishment` varchar(256) NOT NULL,
  `store` varchar(256) NOT NULL,
  `amount` int(11) NOT NULL,
  `category` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Book_Stock`
--

INSERT INTO `Book_Stock` (`name`, `price`, `date`, `publishment`, `store`, `amount`, `category`) VALUES
('book1', 100, '2016', '12623', 'StoreA', 100, 'avc'),
('book2', 100, 'b', 'c', 'StoreA', 500, 'a');

-- --------------------------------------------------------

--
-- Table structure for table `Staff_status`
--

CREATE TABLE `Staff_status` (
  `Username` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `auth_level` int(11) NOT NULL,
  `location` varchar(256) NOT NULL,
  `backup` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Staff_status`
--

INSERT INTO `Staff_status` (`Username`, `password`, `auth_level`, `location`, `backup`) VALUES
('abc', 'bca', 5, 'abt4', NULL),
('bbb', 'bbb', 44, 'ddd', NULL),
('kks', 'abc', 123, 'sa', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `trade_record`
--

CREATE TABLE `trade_record` (
  `name` varchar(256) NOT NULL,
  `date` varchar(256) NOT NULL,
  `price` int(11) NOT NULL,
  `location` varchar(256) NOT NULL,
  `backup` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `AB`
--
ALTER TABLE `AB`
  ADD PRIMARY KEY (`Book`);

--
-- Indexes for table `Staff_status`
--
ALTER TABLE `Staff_status`
  ADD PRIMARY KEY (`Username`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
