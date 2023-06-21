CREATE OR ALTER PROCEDURE DeleteVote
	(
	@vote_id NVARCHAR(50)
)
AS
BEGIN
	DELETE FROM Votes
    WHERE vote_id = @vote_id
END