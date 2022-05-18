export async function initialize_tenant({ sql }) {
  let tenant_data = {
    name: 'first_tenant',
    description: 'first tenant',
    avatar: 'https://i.pravatar.cc/150?img=3'
  }
  let user_data = {
    username: 'tenant_admin',
    password: 'tenant_admin',
    super_user: true,
    uk_admin: true,
    tenant_admin: true,
  }
  const [tenant] = await sql`
    insert into tenant
      (name, description, avatar)
      values
      (${tenant_data.name}, ${tenant_data.description}, ${tenant_data.avatar})
      returning *
  `
  user_data.id_tenant = tenant.id
  const [user] = await sql`
    insert into "user"
      (username, password, super_user, uk_admin, id_tenant, tenant_admin)
      values 
      (
        ${user_data.username}, 
        ${user_data.password}, 
        ${user_data.super_user}, 
        ${user_data.uk_admin},
        ${user_data.id_tenant},
        ${user_data.tenant_admin}
      )
      returning *
  `
  return {
    user,
    tenant
  }
}