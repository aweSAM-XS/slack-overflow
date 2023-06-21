CREATE OR ALTER PROCEDURE GetUserById
	(
	@user_id NVARCHAR(50)
)
AS
BEGIN
	SELECT *
	FROM Users
	WHERE user_id = @user_id
END