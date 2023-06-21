CREATE OR ALTER PROCEDURE CreateComment
(
    @comment_id NVARCHAR(50),
    @user_id NVARCHAR(50),
    @answer_id NVARCHAR(50),
    @comment_body TEXT
)
AS
BEGIN
    INSERT INTO Comments (comment_id, user_id, answer_id, comment_body)
    VALUES (@comment_id, @user_id, @answer_id, @comment_body)
END