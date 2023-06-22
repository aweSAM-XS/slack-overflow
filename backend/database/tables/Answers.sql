CREATE TABLE Answers
(
	answer_id NVARCHAR(50) PRIMARY KEY,
	user_id NVARCHAR(50) FOREIGN KEY REFERENCES Users(user_id),
	question_id NVARCHAR(50) FOREIGN KEY REFERENCES Questions(question_id),
	answer_body TEXT NOT NULL,
	is_accepted BIT DEFAULT 0,
	create_date DATETIME DEFAULT GETDATE(),
	is_deleted BIT DEFAULT 0
);
