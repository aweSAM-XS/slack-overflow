CREATE TABLE QuestionTags
(
	question_id NVARCHAR(50) FOREIGN KEY REFERENCES Questions(question_id),
	tag_id NVARCHAR(50) FOREIGN KEY REFERENCES Tags(tag_id)
);
