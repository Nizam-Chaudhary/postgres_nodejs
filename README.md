This Repository is about Postgres with Nodejs and Sequelize.

# to create Database

npx sequelize-cli db:create

# to generate model

npx sequelize-cli model:generate --name User --attributes userType:ENUM,firstName:string,lastName:string,email:string,password:string

# to migrate

npx sequelize-cli db:migrate
