CREATE TABLE `business` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `business_account` (
	`id` integer PRIMARY KEY NOT NULL,
	`business` integer,
	FOREIGN KEY (`id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`business`) REFERENCES `business`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `product` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`business` integer,
	`name` text NOT NULL,
	`description` text,
	`price` integer DEFAULT 1.7976931348623157e+308 NOT NULL,
	`amount` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`business`) REFERENCES `business`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `product_image` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`product` integer,
	`url` text NOT NULL,
	FOREIGN KEY (`product`) REFERENCES `product`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`passsword_hash` text NOT NULL,
	`user` text DEFAULT 'normal' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user_profile` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`create_date` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
