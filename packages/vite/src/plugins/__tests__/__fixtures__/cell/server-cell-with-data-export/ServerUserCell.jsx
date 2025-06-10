export const data = async ({ id }) => {
  return { user: { id, name: 'John' } }
}

export const Loading = () => <div>Loading...</div>
export const Success = ({ user }) => <div>{user.name}</div>
