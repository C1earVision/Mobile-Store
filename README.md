The project's front-end is hosted on Vercel.

To run the project localy you have to first type: npm install in the terminal of both the Front-End and the Back-End folders
then to open the back-end server type: npm start in the terminal of the Back-End folder.
to open the Front-End server just open the index.html file using live server.

keep in mind that the front end will always send request to the back-end server hosted on this url https://mobilestoreapi-eo3f.onrender.com and that if you want the front end to send the requests to the local back-end you have to change each request manually from https://mobilestoreapi-eo3f.onrender.com to http://localhost:3000

## Deploying to Vercel

To host the Front-End on Vercel:
1. Push your project to GitHub.
2. Go to the [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New** -> **Project**.
3. Import your GitHub repository.
4. In the **Configure Project** settings:
   - Expand the **Root Directory** setting and select `Front-End`.
   - Keep the Framework Preset as **Other**.
   - The Build and Output Settings can be left as default (since it's a static site).
5. Click **Deploy**.

