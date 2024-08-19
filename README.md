This Repository is about Postgres with Nodejs and Sequelize.

# to create Database

npx sequelize-cli db:create

# to generate model

npx sequelize-cli model:generate --name User --attributes userType:ENUM,firstName:string,lastName:string,email:string,password:string

# to migrate

npx sequelize-cli db:migrate

# to undo

npx sequelize-cli db:migrate:undo

# to undo all

npx sequelize-cli db:migrate:undo all

# to create seeder

npx sequelize-cli seed:create --name name-of-seeder

# to run seeder

npx sequelize-cli db:seed:all

# to undo seeder

npx sequelize-cli db:seed:undo
