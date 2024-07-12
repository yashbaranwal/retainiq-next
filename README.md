## Deployed Link
https://retainiq-next-yashbaranwals-projects.vercel.app

## Getting Started

First, install all the dependencies using:
```bash
npm install
```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


## Stack used
Next.js (with app router), Tailwind, shadcn UI.

Linter, Typescript, Sentry & Microsoft Clarity have been integrated to handle the code structure & track down the issues quickly.

## Functionalities

1. Add/Delete a State - 
    By default, there is one product at the beginning with primary variant and variant 2. 
    If we refresh the page, it will be again product as it's hardcoded. We can improve it          more by using either localstorage / backend endpoints.

2. Add/Delete Variant Columns -
    By default, variant 2 is available. And as far as I understood, we shouldn't delete primary variant column.

3. Row Reordering -
    For row reordering, I've used @hello-pangea/dnd library. It's a forked one and a team of developers is maintaing it as its original source weren't maintaing it.

4. Design Insertion (Optional) - 
    I've used reducers to find which product we're selecting and in which variant we're uploading.
    There have been hardcoded img urls for ease of access.

5. Eye for perfection -
    Learnt something new.        
    