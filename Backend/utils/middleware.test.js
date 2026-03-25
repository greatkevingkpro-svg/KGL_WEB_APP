// middleware.test.js
const request = require("supertest");
// const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware.js");
const { authorizeRoles } = require("../middleware/authorizeRoles.js");
const jwt = require("jsonwebtoken");

require("dotenv").config();

/**
 * AUTH MIDDLEWARE UNIT TESTS
 * Tests authentication logic:
 * - Missing token
 * - Invalid token
 * - Valid token
 */
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

  /**
   * Test: No token provided
   * Expectation:
   * - Return 401 Unauthorized
   * - Do not call next()
   */
  it("should return 401 if no token is provided", () => {
    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "No token provided" });
    expect(next).not.toHaveBeenCalled();
  });

  /**
   * Test: Invalid token
   * Expectation:
   * - Return 401 Unauthorized
   * - Do not call next()
   */
  it("should return 401 if token is invalid", () => {
    req.headers.authorization = "Bearer invalidtoken123";
    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid token" });
    expect(next).not.toHaveBeenCalled();
  });

  /**
   * Test: Valid token
   * Expectation:
   * - Call next()
   * - Attach decoded payload to req.user
   */
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


/**
 * AUTHORIZE ROLES UNIT TESTS
 * Tests role-based access control:
 * - Deny access if role not allowed
 * - Allow access if role matches
 *
 * Only "sales" role is allowed in these tests
 */
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

  /**
   * Test: Role not allowed
   * Expectation:
   * - Return 403 Forbidden
   * - Do not call next()
   */
  it("should deny access if role not allowed", () => {
    const middleware = authorizeRoles("sales");
    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Access denied" });
    expect(next).not.toHaveBeenCalled();
  });

  /**
   * Test: Role allowed
   * Expectation:
   * - Call next()
   * - Do not send any error response
   */
  it("should allow access if role is allowed", () => {
    req.user.role = "sales";
    const middleware = authorizeRoles("sales");
    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });
});

