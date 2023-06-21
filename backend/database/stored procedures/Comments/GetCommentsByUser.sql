CREATE OR ALTER PROCEDURE GetCommentsByUser
	(
	@user_id NVARCHAR(50)
)
AS
BEGIN
	SELECT *
	FROM Comments
	WHERE user_id = @user_id
END