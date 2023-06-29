-- Drop'em if they are there
DROP TABLE IF EXISTS Votes;
DROP TABLE IF EXISTS QuestionTags;
DROP TABLE IF EXISTS Tags;
DROP TABLE IF EXISTS Comments;
DROP TABLE IF EXISTS AcceptedAnswers;
DROP TABLE IF EXISTS Answers;
DROP TABLE IF EXISTS Questions;
DROP TABLE IF EXISTS Users;
GO


--Table: Users
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
	user_id NVARCHAR(50) FOREIGN KEY REFERENCES Users(user_id) ON DELETE CASCADE,
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
	question_id NVARCHAR(50) FOREIGN KEY REFERENCES Questions(question_id),
	user_id NVARCHAR(50) FOREIGN KEY REFERENCES Users(user_id) ON DELETE CASCADE,
	answer_body TEXT NOT NULL,
	create_date DATETIME DEFAULT GETDATE(),
	is_deleted BIT DEFAULT 0
);
GO;

-- Table: AcceptedAnswers
CREATE TABLE AcceptedAnswers
(
	answer_id NVARCHAR(50) PRIMARY KEY FOREIGN KEY REFERENCES Answers(answer_id),
	create_date DATETIME DEFAULT GETDATE(),
	email_sent BIT NOT NULL DEFAULT 0,
);
GO

-- Table: Comments
CREATE TABLE Comments
(
	comment_id NVARCHAR(50) PRIMARY KEY,
	user_id NVARCHAR(50) FOREIGN KEY REFERENCES Users(user_id) ON DELETE CASCADE,
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
	question_id NVARCHAR(50) FOREIGN KEY REFERENCES Questions(question_id) ON DELETE CASCADE,
	tag_id NVARCHAR(50) FOREIGN KEY REFERENCES Tags(tag_id) ON DELETE CASCADE
);
GO;

-- Table: Votes
CREATE TABLE Votes
(
	vote_id NVARCHAR(50) PRIMARY KEY,
	user_id NVARCHAR(50) FOREIGN KEY REFERENCES Users(user_id) ON DELETE CASCADE,
	answer_id NVARCHAR(50) FOREIGN KEY REFERENCES Answers(answer_id),
	vote_type NVARCHAR(10)
);
GO;

--------User-related procedures--------
-- Procedure: CreateUser
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

-- Procedure: GetAllUsers
CREATE OR ALTER PROCEDURE GetAllUsers
	(
	@page_size INT,
	@page_number INT
)
AS
BEGIN
	DECLARE @offset INT;
	SET @offset = (@page_number - 1) * @page_size;

	SELECT *
	FROM Users
	WHERE is_deleted = 0
	ORDER BY created_on DESC
    OFFSET @offset ROWS
    FETCH NEXT @page_size ROWS ONLY;
END
GO;


-- Procedure: GetUserById
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

-- Procedure: GetUserByEmail
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

-- Procedure: GetUserByUsername
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

-- Procedure: UpdateUser
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

-- Procedure: DeleteUser
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

CREATE OR ALTER PROCEDURE RemoveUser
	(
	@user_id NVARCHAR(50)
)
AS
BEGIN
	DELETE FROM Users WHERE user_id = @user_id

	DELETE FROM Questions WHERE user_id = @user_id

	DELETE FROM Answers WHERE user_id = @user_id

	DELETE FROM Comments WHERE user_id = @user_id

	DELETE FROM Votes WHERE user_id = @user_id
END
GO;

--------Question-related procedures--------
-- Procedure: CreateQuestion
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

-- Procedure: GetAllQuestions
CREATE OR ALTER PROCEDURE GetAllQuestions
	(
	@page_size INT,
	@page_number INT
)
AS
BEGIN
	DECLARE @offset INT;
	SET @offset = (@page_number - 1) * @page_size;

	SELECT
		Q.question_id,
		Q.user_id,
		Q.question_title,
		Q.question_body,
		Q.creation_date,
		Q.edit_date,
		Q.is_deleted,
		COUNT(A.answer_id) AS answer_count,
		(
            SELECT
			T.tag_name
		FROM
			Tags T
			INNER JOIN QuestionTags QT ON QT.tag_id = T.tag_id
		WHERE
                QT.question_id = Q.question_id
		FOR JSON PATH
        ) AS question_tags
	FROM
		Questions Q
		LEFT JOIN Answers A ON A.question_id = Q.question_id
	WHERE
        Q.is_deleted = 0
	GROUP BY
        Q.question_id,
        Q.user_id,
        Q.question_title,
        Q.question_body,
        Q.creation_date,
        Q.edit_date,
        Q.is_deleted
	ORDER BY
        Q.creation_date DESC
    OFFSET @offset ROWS
    FETCH NEXT @page_size ROWS ONLY;
END
GO;



-- Procedure: GetQuestionById
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

-- Procedure: GetQuestionsByUser
CREATE OR ALTER PROCEDURE GetQuestionsByUser
	(
	@user_id NVARCHAR(50)
)
AS
BEGIN
	SELECT *
	FROM Questions
	WHERE is_deleted = 0 AND user_id = @user_id
END
GO;

-- Procedure: GetQuestionsByTag
CREATE OR ALTER  PROCEDURE GetQuestionsByTag
	(
	@tag_name NVARCHAR(50)
)
AS
BEGIN
	SELECT
		Q.question_id,
		Q.question_title,
		Q.question_body,
		Q.creation_date,
		Q.edit_date,
		(
            SELECT
			T.tag_id,
			T.tag_name
		FROM
			Tags T
			INNER JOIN QuestionTags QT ON QT.tag_id = T.tag_id
		WHERE
                QT.question_id = Q.question_id
		FOR JSON PATH
        ) AS question_tags,
		COUNT(A.answer_id) AS answer_count
	FROM
		Questions Q
		INNER JOIN QuestionTags QT ON Q.question_id = QT.question_id
		INNER JOIN Tags T ON QT.tag_id = T.tag_id
		LEFT JOIN Answers A ON Q.question_id = A.question_id
	WHERE
        T.tag_name = 'swift'
	GROUP BY
        Q.question_id,
        Q.question_title,
        Q.question_body,
        Q.creation_date,
        Q.edit_date;
END
GO;


-- Procedure: UpdateQuestion
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

-- Procedure: DeleteQuestion
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

-- Procedure: RemoveQuestion
CREATE OR ALTER PROCEDURE RemoveQuestion
	(
	@question_id NVARCHAR(50)
)
AS
BEGIN
	DELETE FROM Questions WHERE question_id = @question_id
	DELETE FROM Answers WHERE question_id = @question_id
END
GO;

--------Answer-related procedures--------
-- Procedure: CreateAnswer
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

-- Procedure: GetAnswerById
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

-- Procedure: GetAnswersByQuestion
CREATE OR ALTER PROCEDURE GetAnswersByQuestion
	(
	@question_id NVARCHAR(50)
)
AS
BEGIN
	SELECT
		A.answer_id,
		A.user_id,
		U.username,
		A.answer_body,
		A.create_date,
		COALESCE(SUM(CASE WHEN V.vote_type = 'upvote' THEN 1 WHEN V.vote_type = 'downvote' THEN -1 ELSE 0 END), 0) AS vote_count
	FROM
		Answers A
		INNER JOIN Users U ON U.user_id = A.user_id
		LEFT JOIN Votes V ON V.answer_id = A.answer_id
	WHERE
        A.question_id = @question_id
	GROUP BY
        A.answer_id,
        A.user_id,
        U.username,
        A.answer_body,
        A.create_date
END
GO;

-- Procedure: GetAnswersByUser
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

-- Procedure: AcceptAnswer
CREATE OR ALTER PROCEDURE AcceptAnswer
	(
	@answer_id NVARCHAR(50)
)
AS
BEGIN
	INSERT INTO AcceptedAnswers
		(answer_id)
	VALUES
		(@answer_id);
END;
GO;


-- Procedure: RemoveAcceptedAnswer
CREATE OR ALTER PROCEDURE RemoveAcceptedAnswer
	(@answer_id NVARCHAR(50))
AS
BEGIN
	DELETE FROM AcceptedAnswers
    WHERE answer_id = @answer_id;
END;
GO;


-- Procedure: GetAcceptedAnswers
CREATE OR ALTER PROCEDURE GetAcceptedAnswers
AS
BEGIN
	SELECT
		Users.user_id,
		Users.username,
		Users.email,
		Answers.user_id,
		AcceptedAnswers.answer_id,
		Questions.question_title,
		QuestionUser.username AS question_username
	FROM
		Users
		JOIN
		Answers ON Users.user_id = Answers.user_id
		JOIN
		AcceptedAnswers ON AcceptedAnswers.answer_id = Answers.answer_id
		JOIN
		Questions ON Questions.question_id = Answers.question_id
		JOIN
		Users QuestionUser ON Questions.user_id = QuestionUser.user_id
	WHERE
        AcceptedAnswers.email_sent = 0;
END;
GO;



-- Procedure: UpdateAnswer
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

-- Procedure: DeleteAnswer
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

-- Procedure: RemoveAnswer
CREATE OR ALTER PROCEDURE RemoveAnswer
	(
	@answer_id NVARCHAR(50)
)
AS
BEGIN
	DELETE FROM Answers WHERE answer_id = @answer_id

	DELETE FROM Comments WHERE answer_id = @answer_id

	DELETE FROM Votes WHERE answer_id = @answer_id
END
GO;
--------Comment-related procedures--------
-- Procedure: CreateComment
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

-- Procedure: GetCommentById
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

-- Procedure: GetCommentsByAnswer
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

-- Procedure: GetCommentsByUser
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

-- Procedure: UpdateComment
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

-- Procedure: DeleteComment
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

-- Procedure: RemoveComment
CREATE OR ALTER PROCEDURE RemoveComment
	(
	@comment_id NVARCHAR(50)
)
AS
BEGIN
	DELETE FROM Comments WHERE comment_id = @comment_id
END
GO;

--------Tag-related procedures--------
-- Procedure: CreateTag
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

-- Procedure: GetAllTags
CREATE OR ALTER PROCEDURE GetAllTags
AS
BEGIN
    SELECT
        T.tag_id,
        T.tag_name,
		T.Tag_description,
        COUNT(QT.question_id) AS question_count
    FROM
        Tags T
        LEFT JOIN QuestionTags QT ON T.tag_id = QT.tag_id
    GROUP BY
        T.tag_id,
        T.tag_name,
		T.tag_description;
END
GO;

-- Procedure: GetTagById
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

-- Procedure: GetTagByName
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

-- Procedure: UpdateTag
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

-- Procedure: DeleteTag
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
-- Procedure: GetQuestionTags
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

-- Procedure: AddQuestionTags
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

-- Procedure: UpdateQuestionTags
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
-- Procedure: CreateVote
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

-- Procedure: GetVotesByAnswer
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

-- Procedure: GetVotesByUser
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

-- Procedure: GetVoteByUserAndAnswer
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

-- Procedure: UpdateVote
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

-- Procedure: DeleteVote
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