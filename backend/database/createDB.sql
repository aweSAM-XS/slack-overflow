-- Drop'em if they are there
DROP TABLE IF EXISTS Votes;
DROP TABLE IF EXISTS QuestionTags;
DROP TABLE IF EXISTS Tags;
DROP TABLE IF EXISTS Comments;
DROP TABLE IF EXISTS Answers;
DROP TABLE IF EXISTS Questions;
DROP TABLE IF EXISTS Users;
GO


-- --Table: Users
CREATE TABLE Users
(
	user_id NVARCHAR(50) PRIMARY KEY,
	username NVARCHAR(50) UNIQUE NOT NULL,
	email NVARCHAR(50) UNIQUE NOT NULL,
	password NVARCHAR(100) NOT NULL,
	role NVARCHAR(50) NOT NULL DEFAULT 'user',
	location NVARCHAR(50),
	website NVARCHAR(50),
	twitter NVARCHAR(50),
	github NVARCHAR(50),
	created_on DATETIME DEFAULT GETDATE(),
	is_approved BIT NOT NULL DEFAULT 0,
	email_sent BIT NOT NULL DEFAULT 0,
	is_deleted BIT NOT NULL DEFAULT 0,
	passwordResetRequested BIT NOT NULL DEFAULT 0
);
GO;


-- Table: Questions

CREATE TABLE Questions
(
	question_id NVARCHAR(50) PRIMARY KEY,
	user_id NVARCHAR(50) FOREIGN KEY REFERENCES Users(user_id),
	question_title NVARCHAR(100) NOT NULL,
	question_body TEXT NOT NULL,
	creation_date DATETIME DEFAULT GETDATE(),
	edit_date DATETIME,
	is_deleted BIT DEFAULT 0
);
GO;

-- Table: Answers
CREATE TABLE Answers
(
	answer_id NVARCHAR(50) PRIMARY KEY,
	user_id NVARCHAR(50) FOREIGN KEY REFERENCES Users(user_id),
	question_id NVARCHAR(50) FOREIGN KEY REFERENCES Questions(question_id),
	answer_body TEXT NOT NULL,
	is_accepted BIT DEFAULT 0,
	create_date DATETIME DEFAULT GETDATE(),
	is_deleted BIT DEFAULT 0
);
GO;



-- Table: Comments
CREATE TABLE Comments
(
	comment_id NVARCHAR(50) PRIMARY KEY,
	user_id NVARCHAR(50) FOREIGN KEY REFERENCES Users(user_id),
	answer_id NVARCHAR(50) FOREIGN KEY REFERENCES Answers(answer_id),
	comment_body TEXT NOT NULL,
	Create_date DATETIME DEFAULT GETDATE(),
	is_deleted BIT DEFAULT 0
);
GO;


-- Table: Tags
CREATE TABLE Tags
(
	tag_id NVARCHAR(50) PRIMARY KEY,
	tag_name NVARCHAR(50),
	Tag_description NVARCHAR(100)
);
GO;


-- Table: QuestionTags
CREATE TABLE QuestionTags
(
	question_id NVARCHAR(50) FOREIGN KEY REFERENCES Questions(question_id),
	tag_id NVARCHAR(50) FOREIGN KEY REFERENCES Tags(tag_id)
);
GO;



-- Table: Votes
CREATE TABLE Votes
(
	vote_id NVARCHAR(50) PRIMARY KEY,
	user_id NVARCHAR(50) FOREIGN KEY REFERENCES Users(user_id),
	answer_id NVARCHAR(50) FOREIGN KEY REFERENCES Answers(answer_id),
	vote_type NVARCHAR(10)
);
GO;

--------User-related procedures--------

CREATE OR ALTER PROCEDURE CreateUser
	(
	@user_id NVARCHAR(50),
	@username NVARCHAR(50),
	@email NVARCHAR(50),
	@password NVARCHAR(100)
)
AS
BEGIN
	INSERT INTO Users
		(user_id, username, email, password)
	VALUES
		(@user_id, @username, @email, @password)
END
GO;

CREATE OR ALTER PROCEDURE GetAllUsers
AS
BEGIN
	SELECT *
	FROM Users
	WHERE is_deleted = 0
END
GO;


CREATE OR ALTER PROCEDURE GetUserById
	(
	@user_id NVARCHAR(50)
)
AS
BEGIN
	SELECT *
	FROM Users
	WHERE user_id = @user_id
END;
GO;


CREATE OR ALTER PROCEDURE GetUserByEmail
	(
	@email NVARCHAR(50)
)
AS
BEGIN
	SELECT *
	FROM Users
	WHERE email = @email
END
GO;


CREATE OR ALTER PROCEDURE GetUserByUsername
	(
	@username NVARCHAR(50)
)
AS
BEGIN
	SELECT *
	FROM Users
	WHERE username = @username
END
GO;

CREATE OR ALTER PROCEDURE UpdateUser
	(
	@user_id NVARCHAR(50),
	@username NVARCHAR(50),
	@email NVARCHAR(50),
	@password NVARCHAR(100),
	@role NVARCHAR(50),
	@location NVARCHAR(50),
	@website NVARCHAR(50),
	@twitter NVARCHAR(50),
	@github NVARCHAR(50)
)
AS
BEGIN
	UPDATE Users
    SET username = @username,
        email = @email,
        password = @password,
        role = @role,
        location = @location,
        website = @website,
        twitter = @twitter,
        github = @github
    WHERE user_id = @user_id
END
GO;

CREATE OR ALTER PROCEDURE DeleteUser
	(
	@user_id NVARCHAR(50)
)
AS
BEGIN
	UPDATE Users
	SET is_deleted = 1
    WHERE user_id = @user_id
END
GO;

--------Question-related procedures--------


CREATE OR ALTER PROCEDURE GetAllQuestions
AS
BEGIN
	SELECT *
	FROM Questions
	WHERE is_deleted = 0
END
GO;

CREATE OR ALTER PROCEDURE CreateQuestion
	(
	@question_id NVARCHAR(50),
	@user_id NVARCHAR(50),
	@question_title NVARCHAR(100),
	@question_body TEXT
)
AS
BEGIN
	INSERT INTO Questions
		(question_id, user_id, question_title, question_body)
	VALUES
		(@question_id, @user_id, @question_title, @question_body)
END
GO;

CREATE OR ALTER PROCEDURE GetQuestionById
	(
	@question_id NVARCHAR(50)
)
AS
BEGIN
	SELECT *
	FROM Questions
	WHERE question_id = @question_id
END
GO;

CREATE OR ALTER PROCEDURE GetQuestionsByUser
	(
	@user_id NVARCHAR(50)
)
AS
BEGIN
	SELECT *
	FROM Questions
	WHERE user_id = @user_id
END
GO;

CREATE OR ALTER PROCEDURE UpdateQuestion
	(
	@question_id NVARCHAR(50),
	@question_title NVARCHAR(100),
	@question_body TEXT
)
AS
BEGIN
	UPDATE Questions
    SET question_title = @question_title,
        question_body = @question_body,
		edit_date = GETDATE()
    WHERE question_id = @question_id
END
GO;

CREATE OR ALTER PROCEDURE DeleteQuestion
	(
	@question_id NVARCHAR(50)
)
AS
BEGIN
	UPDATE Questions
    SET is_deleted = 1
    WHERE question_id = @question_id
END
GO;

--------Answer-related procedures--------

CREATE OR ALTER PROCEDURE CreateAnswer
	(
	@answer_id NVARCHAR(50),
	@user_id NVARCHAR(50),
	@question_id NVARCHAR(50),
	@answer_body TEXT
)
AS
BEGIN
	INSERT INTO Answers
		(answer_id, user_id, question_id, answer_body)
	VALUES
		(@answer_id, @user_id, @question_id, @answer_body)
END
GO;

CREATE OR ALTER PROCEDURE GetAnswerById
	(
	@answer_id NVARCHAR(50)
)
AS
BEGIN
	SELECT *
	FROM Answers
	WHERE answer_id = @answer_id
END
GO;

CREATE OR ALTER PROCEDURE GetAnswersByQuestion
	(
	@question_id NVARCHAR(50)
)
AS
BEGIN
	SELECT *
	FROM Answers
	WHERE question_id = @question_id
END
GO;

CREATE OR ALTER PROCEDURE GetAnswersByUser
	(
	@user_id NVARCHAR(50)
)
AS
BEGIN
	SELECT *
	FROM Answers
	WHERE user_id = @user_id
END
GO;

CREATE OR ALTER PROCEDURE GetAcceptedAnswers
AS
BEGIN
	SELECT
		Users.user_id,
		Users.username,
		Users.email,
		Answers.answer_id,
		Questions.question_title,
		Questions.user_id,
		QuestionUser.username AS question_username
	FROM
		Users
		JOIN
		Answers ON Users.user_id = Answers.user_id
		JOIN
		Questions ON Questions.question_id = Answers.question_id
		JOIN
		Users AS QuestionUser ON Questions.user_id = QuestionUser.user_id
	WHERE
        Answers.is_accepted = 1
		AND Answers.email_sent = 0;
END;
GO;

CREATE OR ALTER PROCEDURE UpdateAnswer
	(
	@answer_id NVARCHAR(50),
	@answer_body TEXT
)
AS
BEGIN
	UPDATE Answers
    SET answer_body = @answer_body
    WHERE answer_id = @answer_id
END
GO;


CREATE OR ALTER PROCEDURE AcceptAnswer(
	@answer_id NVARCHAR(50))
AS
BEGIN
	UPDATE Answers 
	SET is_accepted = 1
WHERE answer_id=@answer_id
END
GO;


CREATE OR ALTER PROCEDURE RemoveAcceptedAnswer(@question_id varchar(50))
AS
BEGIN
	UPDATE Answers 
	SET is_accepted =0
	WHERE question_id = @question_id
END
GO;

CREATE OR ALTER PROCEDURE DeleteAnswer
	(
	@answer_id NVARCHAR(50)
)
AS
BEGIN
	UPDATE Answers
	SET is_deleted = 1
    WHERE answer_id = @answer_id
END
GO;

--------Comment-related procedures--------
CREATE OR ALTER PROCEDURE CreateComment
	(
	@comment_id NVARCHAR(50),
	@user_id NVARCHAR(50),
	@answer_id NVARCHAR(50),
	@comment_body TEXT
)
AS
BEGIN
	INSERT INTO Comments
		(comment_id, user_id, answer_id, comment_body)
	VALUES
		(@comment_id, @user_id, @answer_id, @comment_body)
END
GO;

CREATE OR ALTER PROCEDURE GetCommentById
	(
	@comment_id NVARCHAR(50)
)
AS
BEGIN
	SELECT *
	FROM Comments
	WHERE comment_id = @comment_id
END
GO;

CREATE OR ALTER PROCEDURE GetCommentsByAnswer
	(
	@answer_id NVARCHAR(50)
)
AS
BEGIN
	SELECT *
	FROM Comments
	WHERE answer_id = @answer_id
END
GO;

CREATE OR ALTER PROCEDURE GetCommentsByUser
	(
	@user_id NVARCHAR(50)
)
AS
BEGIN
	SELECT *
	FROM Comments
	WHERE user_id = @user_id
END
GO;

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
GO;

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
GO;

--------Tag-related procedures--------
CREATE OR ALTER PROCEDURE CreateTag
	(
	@tag_id NVARCHAR(50),
	@tag_name NVARCHAR(50),
	@Tag_description NVARCHAR(100)
)
AS
BEGIN
	INSERT INTO Tags
		(tag_id, tag_name, Tag_description)
	VALUES
		(@tag_id, @tag_name, @Tag_description)
END
GO;

CREATE OR ALTER PROCEDURE GetTagById
	(
	@tag_id NVARCHAR(50)
)
AS
BEGIN
	SELECT *
	FROM Tags
	WHERE tag_id = @tag_id
END
GO;

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
GO;

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
GO;

CREATE OR ALTER PROCEDURE DeleteTag
	(
	@tag_id NVARCHAR(50)
)
AS
BEGIN
	DELETE FROM Tags
    WHERE tag_id = @tag_id
END
GO;

--------Question Tags Procedures--------
CREATE OR ALTER PROCEDURE GetQuestionTags(@question_id varchar (50))
AS
BEGIN
	SELECT *
	FROM Tags
	WHERE tag_id IN (SELECT tag_id
	FROM QuestionTags
	WHERE question_id =@question_id)
END
GO;

CREATE OR ALTER PROCEDURE AddQuestionTags
	(@question_id varchar(50),
	@tag_id varchar(50))
AS
BEGIN
	INSERT INTO QuestionTags
		(question_id, tag_id)
	VALUES
		( @question_id, @tag_id)
END
GO;

CREATE OR ALTER PROCEDURE UpdateQuestionTags
	(@question_id varchar(50),
	@tag_id varchar(50))
AS
BEGIN
	DELETE FROM QuestionTags WHERE question_id = @question_id
	INSERT INTO QuestionTags
		(question_id, tag_id)
	VALUES
		(@question_id, @tag_id)
END
GO;

--------Vote-related procedures--------

CREATE OR ALTER PROCEDURE CreateVote
	(
	@vote_id NVARCHAR(50),
	@user_id NVARCHAR(50),
	@answer_id NVARCHAR(50),
	@vote_type NVARCHAR(10)
)
AS
BEGIN
	INSERT INTO Votes
		(vote_id, user_id,

		answer_id, vote_type)
	VALUES
		(@vote_id, @user_id, @answer_id, @vote_type)
END
GO;

CREATE OR ALTER PROCEDURE GetVotesByAnswer
	(
	@answer_id NVARCHAR(50)
)
AS
BEGIN
	SELECT *
	FROM Votes
	WHERE answer_id = @answer_id
END
GO;

CREATE OR ALTER PROCEDURE GetVotesByUser
	(
	@user_id NVARCHAR(50)
)
AS
BEGIN
	SELECT *
	FROM Votes
	WHERE user_id = @user_id
END
GO;

CREATE OR ALTER PROCEDURE GetVoteByUserAndAnswer
	(
	@user_id NVARCHAR(50),
	@answer_id NVARCHAR(50)
)
AS
BEGIN
	SELECT *
	FROM Votes
	WHERE user_id = @user_id AND answer_id = @answer_id;
END
GO;

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
GO;

CREATE OR ALTER PROCEDURE DeleteVote
	(
	@vote_id NVARCHAR(50)
)
AS
BEGIN
	DELETE FROM Votes
    WHERE vote_id = @vote_id
END
GO;
