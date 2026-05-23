import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { socket } from "./socket";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [dark, setDark] = useState(true);

  // realtime подключение
  useEffect(() => {
    socket.on("notes:update", (data) => {
      setNotes(data);

      if (!selectedId && data.length > 0) {
        setSelectedId(data[0].id);
      }
    });

    return () => socket.off("notes:update");
  }, [selectedId]);

  const selectedNote = notes.find((n) => n.id === selectedId);

  // отправка изменений на сервер
  const syncNotes = (updated) => {
    setNotes(updated);
    socket.emit("notes:change", updated);
  };

  const createNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: "main.py",
      content: "",
    };

    syncNotes([newNote, ...notes]);
    setSelectedId(newNote.id);
  };

  const updateNote = (field, value) => {
    const updated = notes.map((n) =>
      n.id === selectedId ? { ...n, [field]: value } : n
    );

    syncNotes(updated);
  };

  const deleteNote = (id) => {
    const updated = notes.filter((n) => n.id !== id);

    syncNotes(updated);

    if (selectedId === id && updated.length > 0) {
      setSelectedId(updated[0].id);
    }
  };

  return (
    <div className={dark ? "h-screen flex bg-[#1e1e1e] text-white" : "h-screen flex bg-white text-black"}>
      
      {/* SIDEBAR */}
      <div className="w-72 border-r border-gray-700 flex flex-col">
        <button onClick={createNote} className="bg-blue-600 m-2 p-2 rounded">
          + New File
        </button>

        {notes.map((note) => (
          <div
            key={note.id}
            onClick={() => setSelectedId(note.id)}
            className="flex justify-between p-2 cursor-pointer hover:bg-gray-700"
          >
            <span>{note.title}</span>

            <button onClick={() => deleteNote(note.id)}>×</button>
          </div>
        ))}
      </div>

      {/* EDITOR */}
      <div className="flex-1 flex flex-col">
        {selectedNote && (
          <>
            <input
              value={selectedNote.title}
              onChange={(e) => updateNote("title", e.target.value)}
              className="p-2 bg-gray-800"
            />

            <Editor
              height="100%"
              language="python"
              theme={dark ? "vs-dark" : "light"}
              value={selectedNote.content}
              onChange={(value) => updateNote("content", value || "")}
            />
          </>
        )}
      </div>
    </div>
  );
}
