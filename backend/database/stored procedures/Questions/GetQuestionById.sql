CREATE OR ALTER PROCEDURE GetQuestionById
	(
	@question_id NVARCHAR(50)
)
AS
BEGIN
	SELECT *
	FROM Questions
	WHERE question_id = @question_id
END