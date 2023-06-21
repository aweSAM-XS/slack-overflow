CREATE OR ALTER PROCEDURE UpdateVote
	(
	@vote_id NVARCHAR(50),
	@vote_type NVARCHAR(10)
)
AS
BEGIN
	UPDATE Votes
    SET vote_type = @vote_type
    WHERE vote_id = @vote_id
END