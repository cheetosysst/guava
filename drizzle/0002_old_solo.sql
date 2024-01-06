CREATE TABLE `cart_item` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user` integer,
	`product` integer,
	`amount` integer,
	FOREIGN KEY (`user`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`product`) REFERENCES `product`(`id`) ON UPDATE no action ON DELETE cascade
);
