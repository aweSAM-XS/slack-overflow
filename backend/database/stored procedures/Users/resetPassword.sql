CREATE OR ALTER PROCEDURE ResetPassword
(
    @user_id NVARCHAR(50),
    @password NVARCHAR(100)
)
AS
BEGIN
    UPDATE Users
    SET password = @password
    WHERE user_id = @user_id
END