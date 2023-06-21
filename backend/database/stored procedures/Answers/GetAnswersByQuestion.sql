CREATE OR ALTER PROCEDURE GetAnswersByQuestion
	(
	@question_id NVARCHAR(50)
)
AS
BEGIN
	SELECT *
	FROM Answers
	WHERE question_id = @question_id
END