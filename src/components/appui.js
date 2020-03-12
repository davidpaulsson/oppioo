import React, { useState, useEffect } from "react"
import Numbers from "./numbers"
import styles from "./appui.module.scss"
import appdata from "../fixtures/appdata.json"
import sample from "lodash.sample"

const AppUI = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    setData(sample(appdata))
  }, [])

  if (!data) {
    return null
  }

  const {
    title,
    distanceInKilometers,
    timeInMinutes,
    minutesPerKilometer,
    heartBeatPerMinute,
  } = data

  return (
    <div>
      <div className={styles.title}>{title}</div>
      <Numbers {...{ distanceInKilometers }} />
      <div className={styles.details}>
        <div className={styles.details__time}>
          Tid
          <br />
          {timeInMinutes} min
        </div>
        <div className={styles.details__speed}>
          Hastighet
          <br />
          {minutesPerKilometer} min/km
        </div>
        <div className={styles.details__heartbeat}>
          Hjärtrytm
          <br />
          {heartBeatPerMinute} bpm
        </div>
      </div>
    </div>
  )
}

export default AppUI
