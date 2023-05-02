# 🥬 Kale
Send password-protected messages to anyone, anywhere.

![Kale Homepage](https://i.imgur.com/PiscRzT.png)
![Kale Password Entry](https://i.imgur.com/8n2zkhT.png)
![Kale Message](https://i.imgur.com/OjRw1TY.png)

# Hosting Your Own Instance of Kale
1. Set up a new cluster with [MongoDB Atlas](https://www.mongodb.com/basics/create-database). Create a database named `Kale`, and in it, create a collection named `Messages`. Take note of the Mongo URI (it should look something like `mongodb+srv://USERNAME:PASSWORD@kale.hyf24nk.mongodb.net/?retryWrites=true&w=majority`), which will be used to connect to the cluster.
2. In Network Access, [whitelist your IP](https://coding-boot-camp.github.io/full-stack/mongodb/how-to-set-up-mongodb-atlas#allow-your-ip-address) if you are hosting locally. If you are hosting on the cloud, `Allow Access From Anywhere`.
3. Create a file named `.env` for storing envrionment variables, and store the Mongo URI as `MONGO_URI`. The file should look something like this:
```
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@kale.hyf24nk.mongodb.net/?retryWrites=true&w=majority
```
4. In the console, run `npm i` to install the necessary packages, and then run `npm run` to start Kale!

# Customizing Your Instance of Kale
1. You can customize the name and icon by editing the the HTML files in the `views` folder. In particular, most of the necessary changes will be made in the `head` tag, as well as in the `h1` tag in the `body`.
2. The colours can be customized by editing the first section of the `styles.css` file in the `public` folder:
```css
* {
    --primary: #43a047;
    --primary-hover: #388e3c;
    --primary-focus: rgba(67, 160, 71, 0.125);
    --primary-inverse: #FFF;
}
```
Kale uses PicoCSS, and you can find alternative color schemes [here](https://picocss.com/docs/customization.html).
