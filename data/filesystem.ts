import { Folder } from '../types';

export const fileSystem: Folder = {
  id: 'root',
  name: 'Home',
  type: 'folder',
  children: [
    {
      id: 'docs',
      name: 'Documents',
      type: 'folder',
      children: [
        { id: 'work', name: 'Work', type: 'folder', children: [
            { id: 'report-q1', name: 'Q1_Report.txt', type: 'file', content: 'Q1 sales were strong.' },
            { id: 'pres-deck', name: 'Presentation.txt', type: 'file', content: 'Slides for the upcoming meeting.' },
        ]},
        { id: 'resume', name: 'Resume.txt', type: 'file', content: 'My updated resume.' },
        { id: 'notes', name: 'Personal_Notes.txt', type: 'file', content: 'Grocery list: milk, bread, eggs.' },
      ],
    },
    {
      id: 'pics',
      name: 'Pictures',
      type: 'folder',
      children: [
        { id: 'vacation', name: 'Vacation 2024', type: 'folder', children: [
            { id: 'beach-pic', name: 'beach.jpg', type: 'file' },
            { id: 'mountain-pic', name: 'mountains.jpg', type: 'file' },
        ]},
        { id: 'cat-pic', name: 'cat.jpg', type: 'file' },
        { id: 'logo-pic', name: 'logo.png', type: 'file' },
      ],
    },
    {
        id: 'vids',
        name: 'Videos',
        type: 'folder',
        children: [
            { id: 'game-clip', name: 'game_clip.mp4', type: 'file' },
            { id: 'tutorial-vid', name: 'tutorial.mp4', type: 'file' },
        ]
    },
    {
        id: 'music',
        name: 'Music',
        type: 'folder',
        children: [
            { id: 'rock', name: 'Rock', type: 'folder', children: [
                { id: 'track1', name: 'track01.mp3', type: 'file' },
            ]},
            { id: 'jazz', name: 'Jazz', type: 'folder', children: [
                { id: 'track2', name: 'track02.mp3', type: 'file' },
            ]},
        ]
    }
  ],
};
