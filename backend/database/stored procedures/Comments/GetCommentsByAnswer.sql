CREATE OR ALTER PROCEDURE GetCommentsByAnswer
	(
	@answer_id NVARCHAR(50)
)
AS
BEGIN
	SELECT *
	FROM Comments
	WHERE answer_id = @answer_id
END