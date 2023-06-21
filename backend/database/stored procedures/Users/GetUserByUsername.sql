CREATE OR ALTER PROCEDURE GetUserByUsername
	(
	@username NVARCHAR(50)
)
AS
BEGIN
	SELECT *
	FROM Users
	WHERE username = @username
END
