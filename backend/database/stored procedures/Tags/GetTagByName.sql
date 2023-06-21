CREATE OR ALTER PROCEDURE GetTagByName
	(
	@tag_name NVARCHAR(50)
)
AS
BEGIN
	SELECT *
	FROM Tags
	WHERE tag_name = @tag_name
END