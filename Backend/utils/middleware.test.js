// middleware.test.js
const request = require("supertest");
// const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware.js");
const { authorizeRoles } = require("../middleware/salesAuth.js");
const jwt = require("jsonwebtoken");

require("dotenv").config(); // make sure JWT_SECRET_KEY is loaded

describe("authMiddleware unit tests", () => {
  let req, res, next;

  beforeEach(() => {
    req = { headers: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should return 401 if no token is provided", () => {
    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "No token provided" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 if token is invalid", () => {
    req.headers.authorization = "Bearer invalidtoken123";
    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid token" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should allow access if token is valid", () => {
    const payload = { userName: "john", role: "manager" };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

    req.headers.authorization = `Bearer ${token}`;
    authMiddleware(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user.userName).toBe("john");
    expect(req.user.role).toBe("manager");
  });
});


// Only "sales" role is allowed
describe("authorizeRoles unit tests", () => {
  let req, res, next;

  beforeEach(() => {
    req = { user: { role: "manager" } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should deny access if role not allowed", () => {
    const middleware = authorizeRoles("sales");
    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Access denied" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should allow access if role is allowed", () => {
    req.user.role = "sales";
    const middleware = authorizeRoles("sales");
    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });
});

