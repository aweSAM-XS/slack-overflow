CREATE TABLE Votes
(
	vote_id NVARCHAR(50) PRIMARY KEY,
	user_id NVARCHAR(50) FOREIGN KEY REFERENCES Users(user_id),
	answer_id NVARCHAR(50) FOREIGN KEY REFERENCES Answers(answer_id),
	vote_type NVARCHAR(10)
);
