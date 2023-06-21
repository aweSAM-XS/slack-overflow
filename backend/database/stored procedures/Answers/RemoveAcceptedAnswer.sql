CREATE OR ALTER PROCEDURE RemoveAcceptedAnswer(@question_id varchar(50))
AS
BEGIN
	UPDATE Answers 
	SET is_accepted =0
	WHERE question_id = @question_id
END
