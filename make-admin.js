const { PrismaClient } = require('@prisma/client')
const p = new PrismaClient()

p.user.update({
  where: { email: 'admin@salon.com' },
  data: { role: 'ADMIN' }
}).then(u => {
  console.log('Done:', u.role, u.email)
  p.$disconnect()
}).catch(e => {
  console.error(e)
  p.$disconnect()
})