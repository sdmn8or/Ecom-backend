const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Class 25 Backend API",
            version: "1.0.0",
            description: "API documentation for Class 25 backend project",
        },

        servers: [
            {
                url: "http://localhost:5000",
            },
        ],

        tags: [
            {
                name: "Authentication",
                description: "Authentication related APIs",
            },
            {
                name: "User",
                description: "User related APIs",
            },
            {
                name: "Admin",
                description: "Admin related APIs",
            },
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },

            schemas: {
                User: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            example: "64f123456789abcdef123456",
                        },
                        fullname: {
                            type: "string",
                            example: "Sadmaan Al Saad",
                        },
                        email: {
                            type: "string",
                            example: "example@gmail.com",
                        },
                        role: {
                            type: "string",
                            example: "student",
                        },
                        terms: {
                            type: "boolean",
                            example: true,
                        },
                        isVerified: {
                            type: "boolean",
                            example: false,
                        },
                        status: {
                            type: "string",
                            example: "active",
                        },
                    },
                },

                Registration: {
                    type: "object",
                    required: [
                        "fullname",
                        "email",
                        "password",
                        "confirmpassword",
                        "terms",
                    ],
                    properties: {
                        fullname: {
                            type: "string",
                            example: "Sadmaan Al Saad",
                        },
                        email: {
                            type: "string",
                            example: "example@gmail.com",
                        },
                        password: {
                            type: "string",
                            example: "Password@123",
                        },
                        confirmpassword: {
                            type: "string",
                            example: "Password@123",
                        },
                        terms: {
                            type: "boolean",
                            example: true,
                        },
                    },
                },

                Login: {
                    type: "object",
                    required: [
                        "email",
                        "password",
                    ],
                    properties: {
                        email: {
                            type: "string",
                            example: "example@gmail.com",
                        },
                        password: {
                            type: "string",
                            example: "Password@123",
                        },
                    },
                },

                ForgotPassword: {
                    type: "object",
                    required: [
                        "email",
                    ],
                    properties: {
                        email: {
                            type: "string",
                            example: "example@gmail.com",
                        },
                    },
                },

                ResetPassword: {
                    type: "object",
                    required: [
                        "newpassword",
                        "confirmpassword",
                    ],
                    properties: {
                        newpassword: {
                            type: "string",
                            example: "NewPassword@123",
                        },
                        confirmpassword: {
                            type: "string",
                            example: "NewPassword@123",
                        },
                    },
                },

                Category: {
                    type: "object",
                    required: [
                        "name",
                    ],
                    properties: {
                        name: {
                            type: "string",
                            example: "Electronics",
                        },
                    },
                },

                UpdateUser: {
                    type: "object",
                    properties: {
                        fullname: {
                            type: "string",
                            example: "Updated Name",
                        },
                        email: {
                            type: "string",
                            example: "updated@gmail.com",
                        },
                        role: {
                            type: "string",
                            example: "student",
                        },
                        status: {
                            type: "string",
                            example: "active",
                        },
                    },
                },
            },
        },

        paths: {
            // =========================
            // AUTHENTICATION
            // =========================

            "/api/v1/auth/registration": {
                post: {
                    tags: [
                        "Authentication",
                    ],

                    summary: "Register a new user",

                    description:
                        "Creates a new user account and sends an email verification token.",

                    requestBody: {
                        required: true,

                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Registration",
                                },
                            },
                        },
                    },

                    responses: {
                        201: {
                            description:
                                "User registered successfully",
                        },

                        400: {
                            description:
                                "Validation error or user already exists",
                        },
                    },
                },
            },

            "/api/v1/auth/login": {
                post: {
                    tags: [
                        "Authentication",
                    ],

                    summary: "Login user",

                    description:
                        "Authenticates a user and returns a JWT access token.",

                    requestBody: {
                        required: true,

                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Login",
                                },
                            },
                        },
                    },

                    responses: {
                        200: {
                            description:
                                "User logged in successfully",
                        },

                        400: {
                            description:
                                "User does not exist, missing fields, invalid email, or invalid password",
                        },
                    },
                },
            },

            "/api/v1/auth/verify/{token}": {
                get: {
                    tags: [
                        "Authentication",
                    ],

                    summary: "Verify user email",

                    description:
                        "Verifies a user's email using the verification token.",

                    parameters: [
                        {
                            name: "token",
                            in: "path",
                            required: true,

                            schema: {
                                type: "string",
                            },

                            description:
                                "Email verification JWT token",
                        },
                    ],

                    responses: {
                        200: {
                            description:
                                "Email verified successfully",
                        },

                        400: {
                            description:
                                "Invalid or expired token",
                        },
                    },
                },
            },

            "/api/v1/auth/forgot-password": {
                post: {
                    tags: [
                        "Authentication",
                    ],

                    summary: "Request password reset",

                    description:
                        "Sends a password reset link to the user's email.",

                    requestBody: {
                        required: true,

                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ForgotPassword",
                                },
                            },
                        },
                    },

                    responses: {
                        200: {
                            description:
                                "Password reset email sent",
                        },

                        400: {
                            description:
                                "User does not exist",
                        },
                    },
                },
            },

            "/api/v1/auth/reset-password/{token}": {
                post: {
                    tags: [
                        "Authentication",
                    ],

                    summary: "Reset user password",

                    description:
                        "Changes the user's password using a password reset token.",

                    parameters: [
                        {
                            name: "token",
                            in: "path",
                            required: true,

                            schema: {
                                type: "string",
                            },

                            description:
                                "Password reset JWT token",
                        },
                    ],

                    requestBody: {
                        required: true,

                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ResetPassword",
                                },
                            },
                        },
                    },

                    responses: {
                        200: {
                            description:
                                "Password changed successfully",
                        },

                        400: {
                            description:
                                "Passwords do not match",
                        },
                    },
                },
            },

            // =========================
            // USER
            // =========================

            "/api/v1/user/products": {
                get: {
                    tags: [
                        "User",
                    ],

                    summary: "Get products",

                    description:
                        "Returns the user controller response.",

                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],

                    responses: {
                        200: {
                            description:
                                "User controller response",
                        },

                        401: {
                            description:
                                "Unauthorized",
                        },
                    },
                },
            },

            "/api/v1/user/create/category": {
                post: {
                    tags: [
                        "User",
                    ],

                    summary: "Create a category",

                    description:
                        "Creates a new product category.",

                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],

                    requestBody: {
                        required: true,

                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Category",
                                },
                            },
                        },
                    },

                    responses: {
                        201: {
                            description:
                                "Category created",
                        },

                        400: {
                            description:
                                "Category already exists",
                        },

                        401: {
                            description:
                                "Unauthorized",
                        },
                    },
                },
            },

            "/api/v1/user/categories": {
                get: {
                    tags: [
                        "User",
                    ],

                    summary: "Get all categories",

                    description:
                        "Returns all categories.",

                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],

                    responses: {
                        200: {
                            description:
                                "Categories retrieved successfully",
                        },

                        401: {
                            description:
                                "Unauthorized",
                        },
                    },
                },
            },

            // =========================
            // ADMIN
            // =========================

            "/api/v1/admin/all-users": {
                get: {
                    tags: [
                        "Admin",
                    ],

                    summary: "Get all users",

                    description:
                        "Returns all users without their passwords.",

                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],

                    responses: {
                        200: {
                            description:
                                "Users retrieved successfully",
                        },

                        401: {
                            description:
                                "Unauthorized",
                        },

                        403: {
                            description:
                                "Admin access required",
                        },
                    },
                },
            },

            "/api/v1/admin/user/{id}": {
                get: {
                    tags: [
                        "Admin",
                    ],

                    summary: "Get a single user",

                    description:
                        "Returns a single user using their MongoDB ID.",

                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],

                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,

                            schema: {
                                type: "string",
                            },

                            description:
                                "MongoDB user ID",
                        },
                    ],

                    responses: {
                        200: {
                            description:
                                "User found",
                        },

                        401: {
                            description:
                                "Unauthorized",
                        },

                        403: {
                            description:
                                "Admin access required",
                        },
                    },
                },
            },

            "/api/v1/admin/active/users": {
                get: {
                    tags: [
                        "Admin",
                    ],

                    summary: "Get active users",

                    description:
                        "Returns all users whose status is active.",

                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],

                    responses: {
                        200: {
                            description:
                                "Active users retrieved successfully",
                        },

                        401: {
                            description:
                                "Unauthorized",
                        },

                        403: {
                            description:
                                "Admin access required",
                        },
                    },
                },
            },

            "/api/v1/admin/deactive/users": {
                get: {
                    tags: [
                        "Admin",
                    ],

                    summary: "Get deactive users",

                    description:
                        "Returns all users whose status is deactive.",

                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],

                    responses: {
                        200: {
                            description:
                                "Deactive users retrieved successfully",
                        },

                        401: {
                            description:
                                "Unauthorized",
                        },

                        403: {
                            description:
                                "Admin access required",
                        },
                    },
                },
            },

            "/api/v1/admin/update/user/{id}": {
                post: {
                    tags: [
                        "Admin",
                    ],

                    summary: "Update a user",

                    description:
                        "Updates user information using the user's MongoDB ID.",

                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],

                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,

                            schema: {
                                type: "string",
                            },

                            description:
                                "MongoDB user ID",
                        },
                    ],

                    requestBody: {
                        required: true,

                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/UpdateUser",
                                },
                            },
                        },
                    },

                    responses: {
                        200: {
                            description:
                                "User updated successfully",
                        },

                        401: {
                            description:
                                "Unauthorized",
                        },

                        403: {
                            description:
                                "Admin access required",
                        },
                    },
                },
            },
        },
    },

   
    apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;