//GET to get all thoughts
//GET to get a single thought by it's _id
//POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
//PUT to update a thought by it's _id
//DELETE to remove a thought by it's _id

// /api/thoughts/:thoughtId/reactions
//POST to create a reaction stored in a single thought's reactions array field 
//DELETE to pull and remove a reaction by the reaction's reactionId value

module.exports = {
    async getThoughts(req, res) {

    },
    async getOneThought(req, res) {

    },
    async addThought(req, res) {

    },
    async updateThought(req, res) {

    },
    async deleteThought(req, res) {

    },
    async postReaction(req, res) {

    },
    async deleteReaction(req, res) {

    }
}