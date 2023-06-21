CREATE OR ALTER PROCEDURE GetAnswersByUser
	(
	@user_id NVARCHAR(50)
)
AS
BEGIN
	SELECT *
	FROM Answers
	WHERE user_id = @user_id
END
