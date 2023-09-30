# JSDesk

Yeah, it's yet another JavaScript desktop. But with some cool features. 😎

## Live demo

Feel free to play with it here: https://mmuii.github.io/jsdesk/

## Why?

I've made it simply for fun and for experimenting with some React mechanics. At the beggining I wanted to create only a terminal-like app, but then I thought it would be cool to be able to drag the terminal throughout the screen, and... it evolved to _yet another JavaScript desktop_ 🎉

For the whole development it was only my spare-time project, so it took me a while to build it and I still don't think it's finished, but I don't have enough time anymore to work on it, so I decided to publish it as it is.

Anyway, let's talk about these ✨ _cool features_ ✨

## Cool features

- **Terminal programs rendered as components** - terminal apps are functions that return components which are rendered in the terminal window. It results in a little bit cursed looking code, but this way you can render pretty much anything as a terminal app. Check `snake` or `cat` commands for example.
- **JSON-based filesystem backed by LocalStorage** - Whole system data is stored inside a JSON that works like a filesystem. It's backed by LocalStorage, so it's persistent. There is 4MB of user's space, limited by maximum size of LocalStorage.
- **Filesystem sessions** - Each window that uses filesystem has its own session. It means that you can have multiple windows with different working directories. It's also possible to have multiple windows with the same working directory.
- **JavaScript REPL with consts and lets** - That's a tricky one. I've made a JavaScript REPL that supports `consts` and `lets`. It works by analysing code input, storing all the variable declarations and assignments and re-evaluating them every input. It's for sure not production ready, but it's fun to play with.
- **Code editor** - There's a code editor supported by Monaco editor, integrated with the filesystem and capable of running JS files. Nothing special, but somewhat cool.
