CREATE OR ALTER PROCEDURE UpdateUser
(
    @user_id NVARCHAR(50),
    @username NVARCHAR(50),
    @email NVARCHAR(50),
    @password NVARCHAR(100),
    @role NVARCHAR(50),
    @location NVARCHAR(50),
    @website NVARCHAR(50),
    @twitter NVARCHAR(50),
    @github NVARCHAR(50)
)
AS
BEGIN
    UPDATE Users
    SET username = @username,
        email = @email,
        password = @password,
        role = @role,
        location = @location,
        website = @website,
        twitter = @twitter,
        github = @github
    WHERE user_id = @user_id
END