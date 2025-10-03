// src/components/Subject.jsx
import React, { useState } from 'react';

const Subject = () => {
  // Temporary folders (simulate PDF storage)
  const [folders, setFolders] = useState([
    { id: 1, name: 'Chapter 1' },
    { id: 2, name: 'Chapter 2' },
    { id: 3, name: 'Chapter 3' },
    { id: 4, name: 'Chapter 4' },
    { id: 5, name: 'Chapter 5' },
  ]);

  // Handle opening a folder (currently alert, can replace with PDF viewer)
  const handleOpen = (folderName) => {
    alert(`Open folder: ${folderName}`);
  };

  // Optional: function to add a new folder in future
  const addFolder = (name) => {
    const newFolder = { id: folders.length + 1, name };
    setFolders([...folders, newFolder]);
  };

  return (
    <div className="p-4 bg-gray-900 min-h-screen text-white mx-auto">
      <h1 className="text-2xl font-bold mb-6">Subject PDFs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {folders.map((folder) => (
          <div
            key={folder.id}
            className="bg-gray-800 p-4 rounded-lg flex justify-between items-center shadow hover:bg-gray-700 transition"
          >
            <span className="font-semibold">{folder.name}</span>
            <button
              onClick={() => handleOpen(folder.name)}
              className="bg-cyan-500 px-3 py-1 rounded text-sm hover:bg-cyan-400 transition"
            >
              Open
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subject;
