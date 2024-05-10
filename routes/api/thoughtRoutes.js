// /api/thoughts

//GET to get all thoughts
//GET to get a single thought by it's _id
//POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)

// example data
// {
//     "thoughtText": "Here's a cool thought...",
//     "username": "lernantino",
//     "userId": "5edff358a0fcb779aa7b118b"
//   }

//PUT to update a thought by it's _id
//DELETE to remove a thought by it's _id

//Again, is the following supposed to be in a seperate file? Really can't tell from the instructions

// /api/thoughts/:thoughtId/reactions
//POST to create a reaction stored in a single thought's reactions array field 
//DELETE to pull and remove a reaction by the reaction's reactionId value