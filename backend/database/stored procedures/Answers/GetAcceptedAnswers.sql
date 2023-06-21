CREATE OR ALTER PROCEDURE GetAcceptedAnswers
AS
BEGIN
	SELECT
		Users.user_id,
		Users.username,
		Users.email,
		Answers.answer_id,
		Questions.question_title,
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
