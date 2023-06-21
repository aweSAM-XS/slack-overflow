CREATE OR ALTER PROCEDURE DeleteAnswer
	(
	@answer_id NVARCHAR(50)
)
AS
BEGIN
	UPDATE Answers
	SET is_deleted = 1
    WHERE answer_id = @answer_id
END