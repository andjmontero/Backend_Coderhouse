const express = require("express");
//import express from "express";
const fs = require("fs");

const app = express();
const server = app.listen(8080, () => {});
var visitasItems = 0;
var visitasRandomItem = 0;
app.get("/items", (req, res) => {
  visitasItems = visitasItems + 1;
  fs.promises
    .readFile("./items.txt")
    .then((data) => data.toString("utf-8"))
    .then((datos) => {
      const json = JSON.parse(datos);
      res.send({ items: json, cantidad: json.length });
    });
});
app.get("/item-random", (req, res) => {
  visitasRandomItem = visitasRandomItem + 1;
  let random = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  fs.promises
    .readFile("./items.txt")
    .then((data) => data.toString("utf-8"))
    .then((datos) => {
      const json = JSON.parse(datos);
      let numero = random(0, json.length);
      res.send({ item: json[numero] });
    });
});
app.get("/visitas", (req, res) => {
  res.send({
    visitasALaPaginaDeItems: visitasItems,
    visitasALaPaginaDeItemRandom: visitasRandomItem,
  });
});
