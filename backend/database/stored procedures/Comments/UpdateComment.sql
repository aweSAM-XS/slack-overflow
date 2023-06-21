CREATE OR ALTER PROCEDURE UpdateComment
	(
	@comment_id NVARCHAR(50),
	@comment_body TEXT
)
AS
BEGIN
	UPDATE Comments
    SET comment_body = @comment_body
    WHERE comment_id = @comment_id
END