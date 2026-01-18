"use client"

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'

import "./page.scss";

export type Note = {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
};

const STORAGE_KEY = "notes";


export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  // Load notes from localStorage
  useEffect((): void => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed: Note[] = JSON.parse(saved);

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNotes(parsed);

      if (parsed.length > 0) {
        setActiveNoteId((prevId) => prevId ?? parsed[0].id);
      }
    } catch {
      console.error("Failed to parse notes from localStorage");
    }
  }, []);

  // Save notes to localStorage
  useEffect((): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const activeNote: Note | undefined = notes.find(
    (note) => note.id === activeNoteId
  );

  const createNote = (): void => {

    const newNote: Note = {
      id: crypto.randomUUID(),
      title: `Untitled`,
      content: "",
      updatedAt: Date.now(),
    };

    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setActiveNoteId(newNote.id);
  };

  const updateNote = (content: string): void => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === activeNoteId
          ? { ...note, content, updatedAt: Date.now() }
          : note
      )
    );
  };

  const updateNoteTitle = (id: string, newTitle: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, title: newTitle } : note
      )
    );
  };

  const deleteNote = (id: string): void => {
    setNotes((prevNotes) => {
      const filtered = prevNotes.filter((note) => note.id !== id);

      if (id === activeNoteId) {
        setActiveNoteId(filtered.length > 0 ? filtered[0].id : null);
      }

      return filtered;
    });
  };

  return (
    <div className="notebookContainer">
      {/* Panel 1: Notes List */}
      <div className="panel">
        <button onClick={createNote}>+ New Note</button>
        {notes.map((note: Note) => (
          <div
            key={note.id}
            onClick={() => setActiveNoteId(note.id)}
            className="noteContainer"
          >
            {note.id === activeNoteId ? (
              <div className="selectedNoteContainer">
                 <input
                    id="selected-note"
                    type="text"
                    value={note.title}
                    onChange={(e) => updateNoteTitle(note.id, e.target.value)}
                    autoFocus
                    className="noteSelectedInput"
                  />
                <button
                  className="deleteButton"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNote(note.id);
                  }}
                >
                  🗑
                </button>
              </div>

            ) : (
              <span className="noteUnselected">{note.title}</span>
            )}

           
          </div>
        ))}
      </div>
      {/* Panel 2: Editor */}
      <div className="panel">
        {activeNote ? (
          <textarea
            id="noteTextArea"
            placeholder="Start typing here"
            value={activeNote.content}
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement>
            ) => updateNote(e.target.value)}
            style={{
              width: "100%",
              height: "100%",
              resize: "none",
            }}
          />
        ) : (
          <p>No note selected</p>
        )}
      </div>
      {/* Panel 3: Markdown Preview */}
      <div>
        {activeNote ? (
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                code(props) {
                  const { children, className, node, ...rest } = props
                  const match = /language-(\w+)/.exec(className || '')
                  return match ? (
                    <SyntaxHighlighter
                      {...rest}
                      PreTag="div"
                      // eslint-disable-next-line react/no-children-prop
                      children={String(children).replace(/\n$/, '')}
                      language={match[1]}
                      style={dark}
                    />
                  ) : (
                    <code {...rest} className={className}>
                      {children}
                    </code>
                  )
                }
              }}
            >
              {activeNote.content}
            </ReactMarkdown>
          </div>

        ) : (
          <p>Nothing to preview</p>
        )}
      </div>
    </div>
  );
}
