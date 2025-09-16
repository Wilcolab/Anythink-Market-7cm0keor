/**
 * @module routes/api/comments
 * @description Express router for handling comment-related API endpoints.
 */

 /**
    * GET /api/comments
    * @summary Retrieve all comments
    * @route GET /api/comments
    * @returns {Array<Comment>} 200 - An array of comment objects
    * @returns {object} 500 - Error message
    */

 /**
    * POST /api/comments
    * @summary Create a new comment
    * @route POST /api/comments
    * @param {object} req.body - Comment data
    * @returns {Comment} 201 - The created comment object
    * @returns {object} 400 - Error message
    */

 /**
    * GET /api/comments/:id
    * @summary Retrieve a specific comment by ID
    * @route GET /api/comments/{id}
    * @param {string} id.path.required - Comment ID
    * @returns {Comment} 200 - The requested comment object
    * @returns {object} 404 - Comment not found
    * @returns {object} 500 - Error message
    */

 /**
    * PUT /api/comments/:id
    * @summary Update a specific comment by ID
    * @route PUT /api/comments/{id}
    * @param {string} id.path.required - Comment ID
    * @param {object} req.body - Updated comment data
    * @returns {Comment} 200 - The updated comment object
    * @returns {object} 404 - Comment not found
    * @returns {object} 400 - Error message
    */

 /**
    * DELETE /api/comments/:id
    * @summary Delete a specific comment by ID
    * @route DELETE /api/comments/{id}
    * @param {string} id.path.required - Comment ID
    * @returns {object} 200 - Success message
    * @returns {object} 404 - Comment not found
    * @returns {object} 500 - Error message
    */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;
// Hey GitHub Copilot, please implement the following routes for comments:
// 1. GET /api/comments - Retrieve all comments
// 2. POST /api/comments - Create a new comment
// 3. GET /api/comments/:id - Retrieve a specific comment by ID
// 4. PUT /api/comments/:id - Update a specific comment by ID
// 5. DELETE /api/comments/:id - Delete a specific comment by ID

// GET /api/comments - Retrieve all comments
router.get("/", async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve comments" });
    }
});

// POST /api/comments - Create a new comment
router.post("/", async (req, res) => {
    try {
        const comment = new Comment(req.body);
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ error: "Failed to create comment" });
    }
});

// GET /api/comments/:id - Retrieve a specific comment by ID
router.get("/:id", async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve comment" });
    }
});

// PUT /api/comments/:id - Update a specific comment by ID
router.put("/:id", async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json({ error: "Failed to update comment" });
    }
});

// add another endpoint for deleting a comment by id
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedComment = await Comment.findByIdAndDelete(id);
        if (!deletedComment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete comment" });
    }
});