CREATE OR ALTER PROCEDURE CreateAnswer
	(
	@answer_id NVARCHAR(50),
	@user_id NVARCHAR(50),
	@question_id NVARCHAR(50),
	@answer_body TEXT
)
AS
BEGIN
	INSERT INTO Answers
		(answer_id, user_id, question_id, answer_body)
	VALUES
		(@answer_id, @user_id, @question_id, @answer_body)
END