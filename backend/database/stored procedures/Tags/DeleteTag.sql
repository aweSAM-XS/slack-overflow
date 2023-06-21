CREATE OR ALTER PROCEDURE DeleteTag
	(
	@tag_id NVARCHAR(50)
)
AS
BEGIN
	DELETE FROM Tags
    WHERE tag_id = @tag_id
END