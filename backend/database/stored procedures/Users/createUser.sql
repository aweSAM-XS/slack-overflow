CREATE OR ALTER PROCEDURE CreateUser
	(
	@user_id NVARCHAR(50),
	@username NVARCHAR(50),
	@email NVARCHAR(50),
	@password NVARCHAR(100)
)
AS
BEGIN
	INSERT INTO Users
		(user_id, username, email, password)
	VALUES
		(@user_id, @username, @email, @password)
END