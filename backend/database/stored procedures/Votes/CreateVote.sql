CREATE OR ALTER PROCEDURE CreateVote
(
    @vote_id NVARCHAR(50),
    @user_id NVARCHAR(50),
    @answer_id NVARCHAR(50),
    @vote_type NVARCHAR(10)
)
AS
BEGIN
    INSERT INTO Votes (vote_id, user_id,

 answer_id, vote_type)
    VALUES (@vote_id, @user_id, @answer_id, @vote_type)
END