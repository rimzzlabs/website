CREATE TABLE `reaction` (
	`id` integer PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`created_at` integer DEFAULT '"2024-06-22T05:53:38.152Z"',
	`reaction_type` text NOT NULL
);
