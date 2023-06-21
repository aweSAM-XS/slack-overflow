CREATE OR ALTER PROCEDURE DeleteComment
	(
	@comment_id NVARCHAR(50)
)
AS
BEGIN
	UPDATE Comments
	SET is_deleted = 1
    WHERE comment_id = @comment_id
END