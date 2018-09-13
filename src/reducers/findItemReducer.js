import C from './constants'
import item from './initialState'

export const findItem = (action) => {

   if (action.type === C.FIND_ITEM) {
   	   return item.allItems[0].itemName
   } else {
       return action.item
   }

}
