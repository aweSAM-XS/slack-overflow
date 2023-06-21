CREATE OR ALTER PROCEDURE GetAnswerById
	(
	@answer_id NVARCHAR(50)
)
AS
BEGIN
	SELECT *
	FROM Answers
	WHERE answer_id = @answer_id
END
