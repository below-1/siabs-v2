export async function initialize_tenant({ sql }) {
  let user_data = {
    username: 'tenant_admin',
    password: 'tenant_admin',
    super_user: true,
    timezone: '+08:00'
  }
  const [user] = await sql`
    insert into "user"
      (username, password, super_user, "timezone")
      values 
      (
        ${user_data.username}, 
        ${user_data.password}, 
        ${user_data.super_user},
        ${user_data.timezone}
      )
      returning *
  `
  return {
    user
  }
}