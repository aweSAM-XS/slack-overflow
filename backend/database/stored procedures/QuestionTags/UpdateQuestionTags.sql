CREATE OR ALTER PROCEDURE UpdateQuestionTags
	(@question_id varchar(50),
	@tag_id varchar(50))
AS
BEGIN
	DELETE FROM QuestionTags WHERE question_id = @question_id
	INSERT INTO QuestionTags
		(question_id, tag_id)
	VALUES
		(@question_id, @tag_id)
END