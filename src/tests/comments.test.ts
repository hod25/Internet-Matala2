import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
// import commentsModel from "../models/posts_model";
import { Express } from "express";

let app: Express;

beforeAll(async () => {
  console.log("init app");
  app = await initApp();
  console.log("init app finished");
  // await commentsModel.deleteMany();
  console.log("delete all posts");
});

afterAll(async () => {
  await mongoose.connection.close();
});

let commentId = "";

const testComment1 = {
  owner: "Eliav",
  comment: "My First post",
  postId: "This is my first post",
};

const testComment2 = {
  owner: "Eliav2",
  comment: "My First post 2",
  postId: "This is my first post 2",
};

const testCommentFail = {
  comment: "My First post 2",
  postId: "This is my first post 2",
};

describe("Comments Tests", () => {
  test("Comments Get All coimments", async () => {
    const response = await request(app).get("/comments");
    console.log(response.body);
    expect(response.statusCode).toBe(200);
  });

  test("Comment Create test", async () => {
    const response = await request(app).post("/comments").send(testComment1);
    console.log(response.body);
    const comment = response.body;
    expect(response.statusCode).toBe(201);
    expect(comment.owner).toBe(testComment1.owner);
    expect(comment.comment).toBe(testComment1.comment);
    expect(comment.postId).toBe(testComment1.postId);
    commentId = comment._id;
  });

  // test("Posts Get By Id test", async () => {
  //   const response = await request(app).get("/posts/" + postId);
  //   const post = response.body;
  //   console.log("/posts/" + postId);
  //   console.log(post);
  //   expect(response.statusCode).toBe(200);
  //   expect(response.body._id).toBe(post._id);
  // });

  // test("Posts Get By Id test fail", async () => {
  //   const response = await request(app).get("/posts/" + postId + "3");
  //   const post = response.body;
  //   expect(response.statusCode).toBe(400);
  // });

  // test("Posts Create test", async () => {
  //   const response = await request(app).post("/posts").send(testPost2);
  //   console.log(response.body);
  //   const post = response.body;
  //   expect(response.statusCode).toBe(201);
  //   expect(post.owner).toBe(testPost2.owner);
  //   expect(post.title).toBe(testPost2.title);
  //   expect(post.content).toBe(testPost2.content);
  //   postId = post._id;
  // });

  // test("Posts Create test fail", async () => {
  //   const response = await request(app).post("/posts").send(testPostFail);
  //   expect(response.statusCode).toBe(400);
  // });

  // test("Posts get posts by owner", async () => {
  //   const response = await request(app).get("/posts?owner=" + testPost1.owner);
  //   const post = response.body[0];
  //   expect(response.statusCode).toBe(200);
  //   expect(post.owner).toBe(testPost1.owner);
  //   expect(response.body.length).toBe(1);
  // });

  // test("Posts Delete test", async () => {
  //   const response = await request(app).delete("/posts/" + postId);
  //   expect(response.statusCode).toBe(200);

  //   const respponse2 = await request(app).get("/posts/" + postId);
  //   expect(respponse2.statusCode).toBe(404);

  //   const respponse3 = await request(app).get("/posts/" + postId);
  //   const post = respponse3.body;
  //   console.log(post);
  //   expect(respponse3.statusCode).toBe(404);
  // });
});