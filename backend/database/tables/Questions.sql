CREATE TABLE Questions
(
	question_id NVARCHAR(50) PRIMARY KEY,
	user_id NVARCHAR(50) FOREIGN KEY REFERENCES Users(user_id),
	question_title NVARCHAR(100) NOT NULL,
	question_body TEXT NOT NULL,
	creation_date DATETIME DEFAULT GETDATE(),
	edit_date DATETIME,
	is_deleted BIT DEFAULT 0
);
