CREATE OR ALTER PROCEDURE AcceptAnswer(
	@answer_id NVARCHAR(50))
AS
BEGIN
	UPDATE Answers 
	SET is_accepted = 1
WHERE answer_id=@answer_id
END