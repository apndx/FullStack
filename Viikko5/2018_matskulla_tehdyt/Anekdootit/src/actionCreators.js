const randomAnecdote = () => Number(Math.floor(Math.random() * 6))

export default {
    anecdoteChoosing() {
        return {
            type: 'NEXT',
            id: { randomAnecdote }
        }
    },
    voteAnecdote(id) {
        return {
            type: 'VOTE',
            data: {id}
        }
        }
    }