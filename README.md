Note-MultiFile Markdown Editor

## Getting Started
1. To enable to run development server locally: 
    ```
    npm install
    ```


2. Run the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Project choice
I choose this project because i recently work with markdown and text editors, so i am familiar with this topic. 

## Justification of tools/tech stack
1. I use chatgpt here to get started. Chatgpt overall offers me a very sound and grounded answers and explanation. 
2. I decided to use next.js here for its simplicity. It was very easy to build a project from scratch and start from there. Also I am experienced in javascript/typescript
3. There are a few libraries that I installed such as react-markdown, react-syntax-highlight and node-sass. There were public libraries that up to date and lots of documentation to follow.


## High level approach
1. The design. 3 panels, 3 features.I decided that its going to be a single page application(SPA). I tackled it from left to right.
   * Main app 
     * Had to accommodate the different theming of browser 
     * Think about modularization.
     * Local persistence
     *  First was the note list, did not need to be as wide as the other. The following features.
        *  Need to be clickable to open the note
        *  Need NOT be as wide as the other 2 panels.
        *  Need to show the title of the note
        *  Need to be editable to change title.
     *  Second was the markdown panel.
        *  It is in the center as this is where the user spend most of his/her focus on.
        *  Accept markdown format and store it
     *  Third was the preview panel. This is like straight forward.
        *  Collect the content of the note, which is markdown format
        *  Ensure that the markdown is converted correctly and displayed.


## Challenges
The main challenge was the find the correct tech/library to use. The decision to use next.js was pretty much instantaneous. It was simple, straight forward and pretty much easy to set up. Everything was alright until it comes up to display the markdown format (third panel). 

There were many libraries to use and videos showing how to display markdown. But I found out that the most common one was react-markdown. Tried that, was alright but has to include some extra plugins for correct highlight color and blocks of code.  

The other challenge worth mentioning was with tailwind (v4), it removes all browser default styles. So the markdown component did not work. Had to disabled the default css. 


## Prompting 
When it comes to the using of AI. I used a chain of prompts instead of a single large prompt. I first ask a high level architecture approach and to give me a skeleton code. Then I clarified the framework I decided to used and constrains such as using typescript and sass. I also asked it about react-markdown library, how to implement it correctly and the problem with inline code. Then I ask chatgpt to check my code for syntax or improvements. 

## Iteration(s)
First iteration - everything was at the home page (page.tsx). This works but prevents future extensibility.
Second - Gave the page its own folder. Further refine styling such as border  and implemented App routing.
Third - Feature improvements such as delete button. 


## Final Prompts
Here are the prompts that i used. 

1. I want to create a react note-taking application. It will be a single page application that is split into 3 panels. First panel will be a list of my markdown files/notes. Just a single depth will do for now, no child notes/files. The panel should be smaller compare to the 2nd and 3rd panels as it just show a list that I a able to click and open the files/notes up. Second panel is the edit panel, the user will edit the note in markdown format. So i need a markdown library like react-markdown. Third and final panel will be the live preview panel, where the user is allow to see the changes directly . For where the data is saved, lets just make sure its save locally in the browser for now. I know it will be gone if the user restart the app.

2. This file is a tsx file instead of jsx, can you add the missing types