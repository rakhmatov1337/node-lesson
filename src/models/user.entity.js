import { EntitySchema } from "typeorm";

export const UserEntity = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true, // avtomatik o'suvchi PK
    },
    name: {
      type: "varchar",
      length: 100,
      nullable: false,
    },
    email: {
      type: "varchar",
      length: 150,
      unique: true,
      nullable: false,
    },
    age: {
      type: "int",
      nullable: true,
    },
    userImage: {
      type: "varchar",
      nullable: true,
    },
    password: {
      type: "varchar",
      nullable: false,
    },
    role: {
      type: "varchar",
      length: 20,
      default: "user",
    },

    telegramChatId: {
      type: "bigint",
      nullable: true,
      unique: true,
    },
    
    createdAt: {
      type: "timestamp",
      createDate: true,
    },
    updatedAt: {
      type: "timestamp",
      updateDate: true,
    },
  },
});