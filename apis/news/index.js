const { MongoClient } = require('mongodb');

const { UNAME, PASSWORD, DBNAME } = process.env;
console.log(PASSWORD);
const uri = `mongodb+srv://${UNAME}:${PASSWORD}@cluster0.hi2cn.mongodb.net?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const collection = 'news';

const badRequest = msg => ({
  statusCode: 400,
  headers: {
    "Content-Type": "application/json"
  },
  body: msg,
});

const internalServerError = msg => ({
  statusCode: 500,
  headers: {
    "Content-Type": "application/json"
  },
  body: msg
})

//--------------

exports.handler = async function (event, context) {
  switch (event.body?.action) {
    case "create":
      return await createNews(event);
    default:
      return badRequest("valid action not found");
  }
}

const createNews = async (event) => {
  if (!event.body.title) {
    return badRequest("title is required");
  }
  if (!event.body.content) {
    return badRequest("content is required");
  }
  try {
    await client.connect();
    const database = client.db(DBNAME);
    const news = database.collection(collection);
    const doc = {
      title: event.body.title,
      content: event.body.content,
      tags: event.body.tags,
      create_date: new Date()
    }
    await news.insertOne(doc);
  } catch (err) {

    return internalServerError(err.message);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();

  }
}
