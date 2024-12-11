// import Request from "supertest";
// import initApp from "../server";
// import mongoose from "mongoose";
// import userModel from "../models/users_model";
// import { Express } from "express";

// var app: Express;

// beforeAll(async () => {
//   console.log("beforeAll");
//   app = await initApp();
//   await userModel.deleteMany();
// });

// afterAll((done) => {
//   console.log("afterAll");
//   mongoose.connection.close();
//   done();
// }); 

// let userId = "";
// describe("Users Tests", () => {
//   test("Users test get all", async () => {
//     const response = await Request(app).get("/users");
//     expect(response.statusCode).toBe(200);
//     expect(response.body.length).toBe(0);
//   });

//   test("Test Create User", async () => {
//     const response = await Request(app).post("/users").send({
//       name: "Test User",
//       email: "testuser@example.com",
//       password: "testpassword",
//     });
//     expect(response.statusCode).toBe(201);
//     expect(response.body.name).toBe("Test User");
//     expect(response.body.email).toBe("testuser@example.com");
//     expect(response.body.password).toBe("testpassword");
//     userId = response.body._id;
//     });

//     test("Test get user by email", async () => {    
//         const response = await Request(app).get("//users/${userId");
//         expect(response.statusCode).toBe(200);
//         expect(response.body.name).toBe("Test User");
//         expect(response.body.email).toBe("Test email");
//         expect(response.body.password).toBe("Test password");  
//     });
    
//     test("Test get user by email", async () => {
//         const response = await Request(app).get(`/users/${userId}`);
//         expect(response.statusCode).toBe(200);
//         expect(response.body.name).toBe("Test User");
//         expect(response.body.email).toBe("testuser@example.com");
//         expect(response.body.password).toBe("testpassword");
//       });
      
//       test("Test update user details", async () => {
//         const response = await Request(app).put(`/users/${userId}`).send({
//           name: "Updated User",
//           email: "updateduser@example.com",
//           password: "newpassword",
//         });
//         expect(response.statusCode).toBe(200);
//         expect(response.body.name).toBe("Updated User");
//         expect(response.body.email).toBe("updateduser@example.com");
//         expect(response.body.password).toBe("newpassword");
//       });
      
//       test("Test get updated user", async () => {
//         const response = await Request(app).get(`/users/${userId}`);
//         expect(response.statusCode).toBe(200);
//         expect(response.body.name).toBe("Updated User");
//         expect(response.body.email).toBe("updateduser@example.com");
//         expect(response.body.password).toBe("newpassword");
//       });
      
//       test("Test delete user", async () => {
//         const response = await Request(app).delete(`/users/${userId}`);
//         expect(response.statusCode).toBe(200);
        
//         // Ensure the user no longer exists
//         const response2 = await Request(app).get(`/users/${userId}`);
//         expect(response2.statusCode).toBe(404);
//       });
      
//       test("Test creating a user with missing fields", async () => {
//         const response = await Request(app).post("/users").send({
//           name: "Incomplete User",
//         });
//         expect(response.statusCode).toBe(400);
//       });
//     });
