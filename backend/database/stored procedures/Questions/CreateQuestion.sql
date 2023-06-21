CREATE OR ALTER PROCEDURE CreateQuestion
	(
	@question_id NVARCHAR(50),
	@user_id NVARCHAR(50),
	@question_title NVARCHAR(100),
	@question_body TEXT
)
AS
BEGIN
	INSERT INTO Questions
		(question_id, user_id, question_title, question_body)
	VALUES
		(@question_id, @user_id, @question_title, @question_body)
END