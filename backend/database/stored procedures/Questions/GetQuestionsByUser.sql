CREATE OR ALTER PROCEDURE GetQuestionsByUser
	(
	@user_id NVARCHAR(50)
)
AS
BEGIN
	SELECT *
	FROM Questions
	WHERE user_id = @user_id
END