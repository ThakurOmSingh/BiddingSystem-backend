import express from "express"
import { Router } from "express"
import { itemCreate, getItem, getItems, itemUpdate, itemDelete } from "../controller/itemController.js"
import { getItemBids, newItemBid } from "../controller/bidsController.js"
import { authorization } from "../middleware/authorization.js"
import multer from "multer"
import apiLimiter from "../middleware/apiLimiter.js"

const router = Router()

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./uploads/`)
    },

    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.jpg`)
    }
}
)


const upload = multer({ storage: storage })

apiLimiter
router.post("/", upload.single('image'), authorization, apiLimiter, itemCreate)
router.put('/:id', authorization,apiLimiter, itemUpdate)
router.delete('/:id', authorization,apiLimiter, itemDelete)
router.get('/', getItems)
router.get("/:id", getItem)
router.get("/:id/bids", getItemBids)
router.post("/:id/bids",authorization , apiLimiter, newItemBid)
export default router