import { subNewBill } from "@/graphql/Bill"
import { useSubscription } from "@apollo/client"
import { useEffect, useState } from "react"

export const useSubscriptionBill = () => {
  const{data:notificationNewBill, loading:loadNewBill}=useSubscription(subNewBill)
  const [adminNotifications, setAdminNotifications] = useState([]);
  const notifications = "notifications"
  useEffect(() => {
    if (localStorage.getItem(notifications)) {
      const notificationsArray = JSON.parse(localStorage.getItem(notifications))
      setAdminNotifications(notificationsArray)
    }
  }, [])
  
 useEffect(() => {
   if (!loadNewBill, notificationNewBill) {
    if (localStorage.getItem(notifications)) {
      let storageNotifications = JSON.parse(localStorage.getItem(notifications))
      storageNotifications.push({
        id:"Nueva venta",
          seller: notificationNewBill?.subNewBill.seller?.fullName,
          total: notificationNewBill?.subNewBill.total
      })
      
      setAdminNotifications(storageNotifications)
      localStorage.setItem(notifications,JSON.stringify(storageNotifications))
    } else {
      const newNotification = [
        {
          id:"Nueva venta",
          seller: notificationNewBill?.subNewBill.seller?.fullName,
          total: notificationNewBill?.subNewBill.total
        }
      ]
      localStorage.setItem(notifications, JSON.stringify(newNotification))
    }
   }
 }, [notificationNewBill,loadNewBill])
 

  
  return {
    notificationNewBill
  }
}