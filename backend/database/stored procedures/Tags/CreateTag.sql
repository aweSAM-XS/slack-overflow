CREATE OR ALTER PROCEDURE CreateTag
(
    @tag_id NVARCHAR(50),
    @tag_name NVARCHAR(50),
    @tag_description NVARCHAR(100)
)
AS
BEGIN
    INSERT INTO Tags (tag_id, tag_name, tag_description)
    VALUES (@tag_id, @tag_name, @tag_description)
END