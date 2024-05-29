import { connect } from "http2"
import prisma from "./database.js"
const itemCreate = async ({ data }) => {
 return await prisma.items.create({
  data: {

   user: {
    connect: {
     id: data.ownerId
    }
   },
   name: data.name,
   description: data.description,
   starting_price: data.starting_price,
   current_price: data.current_price,
   end_time: data.end_time,
   image_url: data.image_url
  }
 })

}

const itemUpdate = async ({ id, current_price }) => {
 return await prisma.items.update({
  where: {
   id
  },
  data: {
   current_price
  }
 }
 )
}

export default {
 itemCreate,
 itemUpdate
}