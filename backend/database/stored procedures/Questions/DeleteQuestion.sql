CREATE OR ALTER PROCEDURE DeleteQuestion
	(
	@question_id NVARCHAR(50)
)
AS
BEGIN
	UPDATE Questions
    SET is_deleted = 1
    WHERE question_id = @question_id
END