const express = require("express");
const app = express();
const PropertyModel = require("./models/PropertyModel");
const formatProperty = require("./formatProperty");
const validId = require("./validId");
// const { property } = require("lodash");

app.use(express.json());

app.post("/properties", async (request, response) => {
  const property = request.body;
  const propertyDocument = new PropertyModel(property);
  await propertyDocument.save();

  return response.status(200).send(propertyDocument);
});

app.get("/properties", async (request, response) => {
  const properties = await PropertyModel.find({});
  const formattedProperties = properties.map((property) => {
    return formatProperty(property);
  });
  return response.status(200).send(formattedProperties);
});

app.get("/properties/:id", async (request, response) => {
  const id = request.params.id;
  if (!validId(id)) {
    return response.status(400).send({ message: "id provided is invalid" });
  }

  const properties = await PropertyModel.findById(id).lean();
  // If this is not laid out right the code would try to format an undefined argument.
  if (!properties) {
    return response.status(404).send({ message: "id not found" });
  }
  const formattedProperties = formatProperty(properties);
  return response.status(200).send(formattedProperties);
});
module.exports = app;
