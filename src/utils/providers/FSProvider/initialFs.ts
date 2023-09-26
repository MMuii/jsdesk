import { FileType } from 'utils/hooks/useFileSystem/File';

const documentsDir: FileType = {
  files: [],
  type: 'dir',
  updatedAt: new Date().toISOString(),
  name: 'documents',
  isDirectory: true,
  content: null,
  path: ['/', 'documents'],
};

const readmeFile: FileType = {
  files: [],
  type: 'txt',
  updatedAt: new Date().toISOString(),
  name: 'README.txt',
  content: `                               _         _           _    
                              (_)       | |         | |   
                               _ ___  __| | ___  ___| | __
                              | / __|/ _\` |/ _ \\/ __| |/ /
                              | \\__ \\ (_| |  __/\\__ \\   < 
                              | |___/\\__,_|\\___||___/_|\\_\\
                             _/ |                         
                            |__/                          
                            Yet another JavaScript desktop
======================================================================================

This is a simple desktop-imitating application written in JavaScript, HTML and CSS. 
I've created it, simply because of having too much spare time and a desire to learn 
something new. It does not have any useful features, but a bunch of cool ones instead:

- JSON file system, persisted in LocalStorage
- Window system with a session for each window that uses file system
- Code editor with JavaScript REPL (with working consts and lets!)
- Terminal programs that are rendered as React components

There for sure could be more features added, but I'm not sure if I'll ever get back to 
this project, as it consumed a little bit too much of my spare time afterall. Feel 
free to fork it and add some cool features yourself! I'll be happy to see what you've 
done with it :)

Source code is available here: https://github.com/mmuii/jsdesk`,
  isDirectory: false,
  path: ['/', 'README.txt'],
};

export const fileSystemRoot: FileType = {
  files: [documentsDir, readmeFile],
  type: 'dir',
  updatedAt: new Date().toISOString(),
  name: '/',
  isDirectory: true,
  content: null,
  path: ['/'],
};
