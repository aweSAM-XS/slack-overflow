CREATE OR ALTER PROCEDURE AddQuestionTags
	(@question_id varchar(50),
	@tag_id varchar(50))
AS
BEGIN
	INSERT INTO QuestionTags
		(question_id, tag_id)
	VALUES
		( @question_id, @tag_id)
END