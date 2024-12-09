import request from "supertest";
import mongoose from "mongoose";
import initApp from "../server"; // Import the app initialization function
import { Express } from "express"; // Import the Express type
import UserModel from "../models/user_model"; // Assuming a Mongoose model for user

let app: Express;
let token: string; // To store the JWT token

// Sample test user data
const testUser = {
  username: "testUser",
  email: "testuser@example.com",
  password: "password123",
};

beforeAll(async () => {
  app = initApp(); // Initialize the app

  // Clean up the database before each test
  await UserModel.deleteMany();
});

afterAll(async () => {
  // Close the DB connection after tests are done
  await mongoose.connection.close();
});

describe("User API Tests", () => {
  
  test("User registration (POST /register)", async () => {
    const response = await request(app)
      .post("/api/users/register")
      .send(testUser);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("User registered successfully");
    expect(response.body.user.username).toBe(testUser.username);
  });

  test("User login (POST /login)", async () => {
    // First, register the user
    await request(app)
      .post("/api/users/register")
      .send(testUser);

    const response = await request(app)
      .post("/api/users/login")
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Login successful");
    expect(response.body.userId).toBeDefined();
    token = response.body.token; // Store the JWT token for subsequent tests
  });

  test("Get user by ID (GET /:id) - Protected route", async () => {
    // First, register the user and login to get a token
    const registerResponse = await request(app)
      .post("/api/users/register")
      .send(testUser);
    
    const loginResponse = await request(app)
      .post("/api/users/login")
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    // Use the token from login to access the protected route
    const response = await request(app)
      .get(`/api/users/${registerResponse.body.user._id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(registerResponse.body.user._id);
    expect(response.body.username).toBe(testUser.username);
  });

  test("Get user by ID (GET /:id) - Unauthorized without token", async () => {
    // First, register the user
    const registerResponse = await request(app)
      .post("/api/users/register")
      .send(testUser);

    // Try to get the user without a token (should fail)
    const response = await request(app).get(`/api/users/${registerResponse.body.user._id}`);

    expect(response.statusCode).toBe(401); // Unauthorized
    expect(response.body.error).toBe("No token provided");
  });

  test("Update user profile (PUT /:id) - Protected route", async () => {
    // Register and login the user
    const registerResponse = await request(app)
      .post("/api/users/register")
      .send(testUser);

    const loginResponse = await request(app)
      .post("/api/users/login")
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    // Update user profile
    const updatedUserData = { username: "updatedUser" };
    const response = await request(app)
      .put(`/api/users/${registerResponse.body.user._id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(updatedUserData);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("User updated");
    expect(response.body.user.username).toBe(updatedUserData.username);
  });

  test("Delete user (DELETE /:id) - Protected route", async () => {
    // Register and login the user
    const registerResponse = await request(app)
      .post("/api/users/register")
      .send(testUser);

    const loginResponse = await request(app)
      .post("/api/users/login")
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    // Delete the user
    const response = await request(app)
      .delete(`/api/users/${registerResponse.body.user._id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("User deleted");
  });
});
