import React, { useEffect } from "react"
import { useParams, withRouter } from "react-router-dom"

const Redeem = ({ history }) => {
  console.log(history)
  const { eventID, year, qrID } = useParams()

  useEffect(() => {
    history.push({
      pathname: "/redemption",
      state: {
        eventID,
        year,
        qrID
      }
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <></>
  )
}

export default withRouter(Redeem);