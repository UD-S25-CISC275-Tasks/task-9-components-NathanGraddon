import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";
import { duplicateQuestion, makeBlankQuestion } from "./objects";

/**
 * Consumes an array of questions and returns a new array with only the questions
 * that are `published`.
 */
export function getPublishedQuestions(questions: Question[]): Question[] {
    const deepCopy = questions.map((x: Question): Question => ({ ...x }));
    const copyQue = deepCopy.filter((pub: Question): boolean => pub.published);
    return copyQue;
}

/**
 * Consumes an array of questions and returns a new array of only the questions that are
 * considered "non-empty". An empty question has an empty string for its `body` and
 * `expected`, and an empty array for its `options`.
 */
export function getNonEmptyQuestions(questions: Question[]): Question[] {
    const deepCopy = questions.map((x: Question): Question => ({ ...x }));
    const copyQue = deepCopy.filter(
        (x: Question): boolean =>
            x.body !== "" || x.expected !== "" || x.options.length !== 0,
    );
    return copyQue;
}

/***
 * Consumes an array of questions and returns the question with the given `id`. If the
 * question is not found, return `null` instead.
 */
export function findQuestion(
    questions: Question[],
    id: number,
): Question | null {
    const deepCopy = questions.map((x: Question): Question => ({ ...x }));
    const theQuestion = deepCopy.find((x: Question): boolean => x.id === id);
    if (!theQuestion) {
        return null;
    }
    return theQuestion;
}

/**
 * Consumes an array of questions and returns a new array that does not contain the question
 * with the given `id`.
 */
export function removeQuestion(questions: Question[], id: number): Question[] {
    const deepCopy = questions.map((x: Question): Question => ({ ...x }));
    const remove = deepCopy.filter((x: Question): boolean => x.id !== id);
    return remove;
}

/***
 * Consumes an array of questions and returns a new array containing just the names of the
 * questions, as an array.
 */
export function getNames(questions: Question[]): string[] {
    const deepCopy = questions.map((x: Question): Question => ({ ...x }));
    const justNames = deepCopy.map((x: Question): string => x.name);
    return justNames;
}

/***
 * Consumes an array of questions and returns the sum total of all their points added together.
 */
export function sumPoints(questions: Question[]): number {
    let total: number = 0;
    const deepCopy = questions.map((x: Question): Question => ({ ...x }));
    deepCopy.map((x: Question) => (total += x.points));
    return total;
}

/***
 * Consumes an array of questions and returns the sum total of the PUBLISHED questions.
 */
export function sumPublishedPoints(questions: Question[]): number {
    let count: number = 0;
    const deepCopy = questions.map((x: Question): Question => ({ ...x }));
    deepCopy.map((x: Question) => (x.published ? (count += x.points) : count));
    return count;
}

/***
 * Consumes an array of questions, and produces a Comma-Separated Value (CSV) string representation.
 * A CSV is a type of file frequently used to share tabular data; we will use a single string
 * to represent the entire file. The first line of the file is the headers "id", "name", "options",
 * "points", and "published". The following line contains the value for each question, separated by
 * commas. For the `options` field, use the NUMBER of options.
 *
 * Here is an example of what this will look like (do not include the border).
 *`
id,name,options,points,published
1,Addition,0,1,true
2,Letters,0,1,false
5,Colors,3,1,true
9,Shapes,3,2,false
` *
 * Check the unit tests for more examples!
 */
export function toCSV(questions: Question[]): string {
    const deepCopy = questions.map((x: Question): Question => ({ ...x }));
    const toStr = deepCopy.map(
        (x: Question) =>
            x.id +
            "," +
            x.name +
            "," +
            x.options.length +
            "," +
            x.points +
            "," +
            x.published,
    );
    return ["id,name,options,points,published", ...toStr].join("\n");
}

/**
 * Consumes an array of Questions and produces a corresponding array of
 * Answers. Each Question gets its own Answer, copying over the `id` as the `questionId`,
 * making the `text` an empty string, and using false for both `submitted` and `correct`.
 */
export function makeAnswers(questions: Question[]): Answer[] {
    const deepCopy = questions.map((x: Question): Question => ({ ...x }));
    const answer = deepCopy.map((x: Question) => ({
        questionId: x.id,
        text: "",
        submitted: false,
        correct: false,
    }));
    return answer;
}

/***
 * Consumes an array of Questions and produces a new array of questions, where
 * each question is now published, regardless of its previous published status.
 */
export function publishAll(questions: Question[]): Question[] {
    const deepCopy = questions.map((x: Question): Question => ({ ...x }));
    const pub = deepCopy.map((x: Question) => ({ ...x, published: true }));
    return pub;
}

/***
 * Consumes an array of Questions and produces whether or not all the questions
 * are the same type. They can be any type, as long as they are all the SAME type.
 */
export function sameType(questions: Question[]): boolean {
    const deepCopy = questions.map((x: Question): Question => ({ ...x }));
    const sameType = deepCopy.filter(
        (x: Question): boolean => deepCopy[0].type === x.type,
    );
    if (sameType.length === deepCopy.length) {
        return true;
    }
    return false;
}

/***
 * Consumes an array of Questions and produces a new array of the same Questions,
 * except that a blank question has been added onto the end. Reuse the `makeBlankQuestion`
 * you defined in the `objects.ts` file.
 */
export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType,
): Question[] {
    let deepCopy = questions.map((x: Question): Question => ({ ...x }));
    deepCopy = [...deepCopy, makeBlankQuestion(id, name, type)];
    return deepCopy;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its name should now be `newName`.
 */
export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string,
): Question[] {
    const deepCopy = questions.map((x: Question): Question => ({ ...x }));
    const newCopy = deepCopy.map((x: Question) =>
        x.id === targetId ? { ...x, name: newName } : x,
    );
    return newCopy;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `type` should now be the `newQuestionType`
 * AND if the `newQuestionType` is no longer "multiple_choice_question" than the `options`
 * must be set to an empty list.
 */
export function changeQuestionTypeById(
    questions: Question[],
    targetId: number,
    newQuestionType: QuestionType,
): Question[] {
    const deepCopy = questions.map((x: Question): Question => ({ ...x }));
    let newCopy = deepCopy.map((x: Question) =>
        x.id === targetId ? { ...x, type: newQuestionType } : x,
    );
    newCopy.map((x) =>
        x.id === targetId && x.type !== "multiple_choice_question" ?
            (x.options = [])
        :   x,
    );
    return newCopy;
}

/**
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `option` array should have a new element.
 * If the `targetOptionIndex` is -1, the `newOption` should be added to the end of the list.
 * Otherwise, it should *replace* the existing element at the `targetOptionIndex`.
 *
 * Remember, if a function starts getting too complicated, think about how a helper function
 * can make it simpler! Break down complicated tasks into little pieces.
 */
export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string,
): Question[] {
    return questions.map((question) => {
        if (question.id !== targetId) {
            return question;
        }
        let update = [...question.options];
        if (targetOptionIndex === -1) {
            update = [...question.options, newOption];
        } else {
            update[targetOptionIndex] = newOption;
        }
        return { ...question, options: update };
    });
}

/***
 * Consumes an array of questions, and produces a new array based on the original array.
 * The only difference is that the question with id `targetId` should now be duplicated, with
 * the duplicate inserted directly after the original question. Use the `duplicateQuestion`
 * function you defined previously; the `newId` is the parameter to use for the duplicate's ID.
 */
export function duplicateQuestionInArray(
    questions: Question[],
    targetId: number,
    newId: number,
): Question[] {
    let duplicate: Question = questions[0];
    const deepCopy = questions.map((x: Question): Question => ({ ...x }));
    deepCopy.map((x: Question) => (x.id === targetId ? (duplicate = x) : x));
    deepCopy.splice(
        deepCopy.indexOf(duplicate) + 1,
        0,
        duplicateQuestion(newId, duplicate),
    );
    return deepCopy;
}
