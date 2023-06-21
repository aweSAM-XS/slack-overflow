
CREATE OR ALTER PROCEDURE GetUserByEmail
	(
	@email NVARCHAR(50)
)
AS
BEGIN
	SELECT *
	FROM Users
	WHERE email = @email
END