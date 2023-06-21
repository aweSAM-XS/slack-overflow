CREATE OR ALTER PROCEDURE DeleteUser
	(
	@user_id NVARCHAR(50)
)
AS
BEGIN
	UPDATE Users
	SET is_deleted = 1
    WHERE user_id = @user_id
END
