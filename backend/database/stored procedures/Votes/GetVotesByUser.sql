CREATE OR ALTER PROCEDURE GetVotesByUser
(
    @user_id NVARCHAR(50)
)
AS
BEGIN
    SELECT *
    FROM Votes
    WHERE user_id = @user_id
END