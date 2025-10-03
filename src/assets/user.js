// Admin credentials
export const adminCredentials = {
  username: "admin",
  password: "admin123",
};

// User accounts
export const users = [
  {
    id: 1,
    username: "john",
    password: "john123",
    fullName: "John Doe",
    solvedQuestions: [
      {
        questionId: 101,
        note: "Tricky edge cases with null strings",
        revision: true,
        status: "solved",
      },
      {
        questionId: 103,
        note: "Need to revisit time complexity part",
        revision: false,
        status: "unsolved",
      },
    ],
  },
  {
    id: 2,
    username: "jane",
    password: "jane123",
    fullName: "Jane Smith",
    solvedQuestions: [
      {
        questionId: 102,
        note: "Reference concept clear now",
        revision: false,
        status: "solved",
      },
      {
        questionId: 201,
        note: "Good practice for linked lists",
        revision: true,
        status: "solved",
      },
    ],
  },
  {
    id: 3,
    username: "alice",
    password: "alice123",
    fullName: "Alice Johnson",
    solvedQuestions: [
      {
        questionId: 103,
        note: "Still struggling with complexity",
        revision: true,
        status: "unsolved",
      },
    ],
  },
];
