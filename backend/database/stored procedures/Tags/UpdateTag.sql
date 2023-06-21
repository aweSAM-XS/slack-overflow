CREATE OR ALTER PROCEDURE UpdateTag
	(
	@tag_id NVARCHAR(50),
	@tag_name NVARCHAR(50),
	@Tag_description NVARCHAR(100)
)
AS
BEGIN
	UPDATE Tags
    SET tag_name = @tag_name,
        Tag_description = @Tag_description
    WHERE tag_id = @tag_id
END