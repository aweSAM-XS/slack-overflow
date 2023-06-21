CREATE OR ALTER PROCEDURE GetVoteByUserAndAnswer
	(
	@user_id NVARCHAR(50),
	@answer_id NVARCHAR(50)
)
AS
BEGIN
	SELECT *
	FROM Votes
	WHERE user_id = @user_id AND answer_id = @answer_id;
END