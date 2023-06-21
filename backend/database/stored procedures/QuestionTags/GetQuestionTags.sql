CREATE OR ALTER PROCEDURE GetQuestionTags(@question_id varchar (50))
AS
BEGIN
	SELECT *
	FROM Tags
	WHERE tag_id IN (SELECT tag_id
	FROM QuestionTags
	WHERE question_id =@question_id)
END