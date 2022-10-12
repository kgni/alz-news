# Alzh.info

Easy-to-use, non-profit platform for anyone who has an interest in Alzheimer's or Dementia.
The purpose is to make resources including articles, journals, practical information and all kinds of knowledge, easily accessible by gathering it all in one place.

Alzh.info is not affiliated with any Alzheimer's organizations or patients advocacy groups in any way.

**Link to project:** https://www.alzh.info/
![Alzh info-homepage](https://user-images.githubusercontent.com/84397151/195405928-5f765e9c-c4fd-470d-98fc-df110c89cd17.png)
_FOR MORE IMAGES OF THE APPLICATION GO TO THE [EXAMPLES](#examples) SECTION_

## How It's Made:

**Tech used:** HTML, CSS, Tailwind, JavaScript, React, NextJS, NodeJS, Express, MongoDB, Cheerio, Puppeteer

## Frontend

Frontend consists of a React application made with NextJS and Tailwind. Currently there are a few static pages, but the most important page is the "News" page, with over 6000 articles from 6 different publicers.

### News

To optimize the searching functionality, debounced queries to the DB are made.

## Dashboard

This is not something that the users get to see, yet. The dashboard is used by admins to _Quality-assure_ the articles scraped, as well as updating and deleting them.

<img src="https://user-images.githubusercontent.com/84397151/195382721-487b4c7e-5424-4597-93a3-d41c47ecc0a3.gif" width="50%" alt="Dashboard"/>

## Backend

Made with NodeJS and Express. The first responsibility for the backend, is to act as an API for us to be able to do CRUD operations on the articles in the DB. The second responsibility is scraping articles.

### Webscraping

Made with cheerio and puppeteer. Currently there is a script running repeateadly a few times a day, fetching the newest articles from 6 different sources.
These articles are then displayed inside of the dashboard, where we can update all properties as needed or delete articles. Each article forexample has a status field, which will initially be set to pending, where the admin will either approve or reject the scraped article.
By having this dashboard, we are ensuring a standard for each article. Only articles with the status set to _'APPROVED'_ will be showed to the users.

The data that is currently being scraped is:

- title, subtitle, url, publisher, publisher URL, publish date, categories, type, status

To prevent duplications, each article being scraped is validated with articles already scraped or in the database. If we have a match in articles (title & url), the article won't be added to the DB.

## Optimizations / Future plans

### Add Journals / Scientific papers

One of the original plans was to gather all journals and scientific papers from the major publicers.

When researching I quickly found that it was hard to nagivate through journals and scientific papers.
They are in general really poorly displayed with bad UI/UX. It is also difficult to keep track of how many different publicers there are. In other words, it is easy to miss crucial research.

The next bigger mission, is therefore to gather as many journals as possible, and displaying them in a way, where it will be really easy for users to find exactly what they need. Journals will be categorized into the different publicers, sort of like we are doing it with news articles.

### Finish user dashboard

In the future, users will be able to login, and have articles and journals saved to their own dashboard.

### Let users provide news articles

Users will in the future be able, to provide news articles, that will be sent to the admin dashboard for approval.

### General issues / features

If you want to see more about current issues, features or want to do a feature request - you can do it [here](https://github.com/kgni/alzh-info/issues)

## Lessons Learned:

### NextJS

Learned alot about NextJS, and I've really come to love it! I really like the developer experience, especially when it comes to easy routing and all the features that it provides for production.
I can only agree, that vercel is not lying when they say: _"Server rendering React applications has never been easier"_.

### NextAuth

In general I learned about the difference between token-based and server-side authentication.
Implemented token-based auth using the NextAuth library.
Currently the frontend is only set up for myself to login to the dashboard using credentials.
Both login and signup functionality for users is already ready and will be shipped as soon as the user dashboard is built.

### Building a Webscraper

This was my first time building out webscraping scripts. I learned about 2 different libraries- **Cheerio** & **Puppeteer**.

**Cheerio**, _"parses markup and provides an API for traversing/manipulating the resulting data structure."_

- Since cheerio is really lightweight compared to other options (like headless browsers) I'm using this for scraping, if there is not need for interactions with the browser.

**Puppeteer**, _"is a Node library which provides a high-level API to control headless Chrome or Chromium over the DevTools Protocol."_

- If interactions with the webpage needs to be made, I will use Puppeteer instead. Some examples could be:
  - If articles are lazy loaded or paginated - infinite scroll / load more button.
  - To remove popups.

### Building a dashboard with CRUD functionality

- Working with a lot of data, and figuring out how to display it in a way that is easy to work with.
  The dashboard table is made with the react-table library, and then additional features has been added to it, such as opening a modal for each article, where we can edit them.
  Additional searching functioanlity has been added, such as only displaying recommened articles, or displaying articles depending on their status.

### Implementing third party vanillaJS libraries into NextJS

Implemented [Nextparticle](https://nextparticle.nextco.de/) into the app.
Had to figure out how the vanilla script worked, and how to create a component from the constructor function inside of that.
I learned how to dynamically import components with the dynamic API in Next, so that components interacting with Web APIs (such as the window and document), are not server-side rendered where they don't have access to these .

## Examples:

<h2 align="center">Dashboard</h1>
<img src="https://user-images.githubusercontent.com/84397151/195382721-487b4c7e-5424-4597-93a3-d41c47ecc0a3.gif" width="100%" alt="Dashboard"/>

<h2 align="center">Login / Sign up</h1>
<table bordercolor="#66b2b2">
  
  
<!--  FIRST ROW   -->
  <tr>
    <td width="50%" valign="top">
        <br />
        <p>
             <img src="https://user-images.githubusercontent.com/84397151/195383003-59ddd2a1-715d-4241-9505-7f1b9bcea113.png" width="100%" alt="Login page"/>
        </p>
        <br />
    </td>
    <td width="50%" valign="top">
        <br />
      <p>
           <img src="https://user-images.githubusercontent.com/84397151/195383078-5686a818-0824-4ac4-acb1-56b3a7e8ecdb.png" width="100%"  alt="Sign up page"/>
        </p>
        <br />
    </td>
  </tr>
  </table>

## Other projects:

**Portfolio:** https://github.com/kgni/portfolio

**RUN AWAY:** https://github.com/kgni/run-away

**Salon Hair Valby:** https://github.com/kgni/salonhair-valby
