## Exercise 10

**a. How a new concurrency works and what is the main difference to old version of React rendering model?**  
Concurrency bring concurrent rendering, which allows for the application to prepare multiple different versions of a web application's UI. It means that React can now pause and resume rendering the UI. In the old versions of react, the rendering was done synchronously, which meant that big changes to the UI would make the site feel unresponsive.

**b. What is a Suspence component and give one example where it should be used?**  
The Suspence component can be used for handling asynchronous operations like fetching. The component will display a different UI (such as a loading screen) while the async operation is happening. It should be used for example when an application is fetching data from a database, so that it provides an experience that feels responsive.


**c. When you should use SSR and when not?**  
Server-side rendering should be used when SEO is important to the developer of the site, because search engine crawlers can parse the content that is on the server. It should also be used in more static sites that contain a lot of different content, because it makes the page(s) load faster.

SSR should not, however, be used in applications that are really interactive, because they tend to require a lot of client-side rendering and updates to the UI.

**d. What is a useTransition() hook and where it should be used?**  
The useTransition() is a hook that allows for managing the transitions in concurrent updates, making the UI feels smoother by allowing the user to keep using the app during long updates.
It should be used when there is an interactive UI that makes changes that take a long time.

**e. What is a useIdhook and where it should be used?**  
The useId hook can be used to generate unique id's that can be used between the server and client sides. It should be used when generating components that require unique id's.


**f. A few questions was presented. Did you find some other good new feature. Just name it in here and explain why feature is good one.**  

Another good feature i found was Automatic Batching, which allows for the grouping of multiple different state updates to be rendered in the same instance. This feature is useful, when the UI changes multiple different values based on one user input/change.
