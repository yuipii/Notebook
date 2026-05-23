let notes = [
  {
    id: "1",
    title: "main.py",
    content: 'print("Hello world")',
  },
];

export const getNotes = () => notes;

export const setNotes = (newNotes) => {
  notes = newNotes;
};
