CREATE TABLE Comments
(
	comment_id NVARCHAR(50) PRIMARY KEY,
	user_id NVARCHAR(50) FOREIGN KEY REFERENCES Users(user_id),
	answer_id NVARCHAR(50) FOREIGN KEY REFERENCES Answers(answer_id),
	comment_body TEXT,
	Create_date DATETIME DEFAULT GETDATE(),
	is_deleted BIT DEFAULT 0
);
