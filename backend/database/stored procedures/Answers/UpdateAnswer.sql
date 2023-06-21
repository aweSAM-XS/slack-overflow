CREATE OR ALTER PROCEDURE UpdateAnswer
	(
	@answer_id NVARCHAR(50),
	@answer_body TEXT
)
AS
BEGIN
	UPDATE Answers
    SET answer_body = @answer_body
    WHERE answer_id = @answer_id
END