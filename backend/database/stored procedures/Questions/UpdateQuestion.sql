CREATE OR ALTER PROCEDURE UpdateQuestion
	(
	@question_id NVARCHAR(50),
	@question_title NVARCHAR(100),
	@question_body TEXT
)
AS
BEGIN
	UPDATE Questions
    SET question_title = @question_title,
        question_body = @question_body,
		edit_date = GETDATE()
    WHERE question_id = @question_id
END