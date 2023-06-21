CREATE OR ALTER PROCEDURE GetVotesByAnswer
	(
	@answer_id NVARCHAR(50)
)
AS
BEGIN
	SELECT *
	FROM Votes
	WHERE answer_id = @answer_id
END