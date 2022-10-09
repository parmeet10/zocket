CREATE TABLE
  `products` (
    `id` int NOT NULL AUTO_INCREMENT,
    `product` varchar(64) NOT NULL,
    `active`  BOOL NOT NULL DEFAULT TRUE,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime DEFAULT NULL,
    PRIMARY KEY (`id`)
  )

  CREATE TABLE
  `platforms` (
    `id` int NOT NULL AUTO_INCREMENT,
    `platform` varchar(64) NOT NULL,
    `active`  BOOL NOT NULL DEFAULT TRUE,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime DEFAULT NULL,
    PRIMARY KEY (`id`)
  )


CREATE table
  `campaigns` (
    `id` int NOT NULL AUTO_INCREMENT,
    `campaign` varchar(64) NOT NULL,
    `budget` int NOT NULL,
    `location` varchar(64) NOT NULL,
    `product_id` int NOT NULL,
    `platform_id` int NOT NULL,
    `start` datetime NOT NULL,
    `end` datetime NOT NULL,
    `active`  BOOL NOT NULL DEFAULT TRUE,
    `status` varchar(64) not null ,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime DEFAULT NULL,
    PRIMARY KEY (`id`),
    FOREIGN kEY (`product_id`) references `products`(`id`),
    FOREIGN kEY (`platform_id`) references `platforms`(`id`)
  );