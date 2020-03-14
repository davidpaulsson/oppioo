import sample from "lodash.sample"
import React, { useEffect, useState, forwardRef } from "react"
import appdata from "../fixtures/appdata.json"
import styles from "./appui.module.scss"
import Numbers from "./numbers"

const AppUI = React.forwardRef((_, ref) => {
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
    <div ref={ref}>
      <div className={styles.title}>{title}</div>
      <Numbers {...{ distanceInKilometers }} />
      <div className={styles.details}>
        <div className={styles.details__time}>
          <div className={styles.details__title}>Tid</div>
          {timeInMinutes} <span className={styles.details__unit}>min</span>
        </div>
        <div className={styles.details__speed}>
          <div className={styles.details__title}>Hastighet</div>
          {minutesPerKilometer}{" "}
          <span className={styles.details__unit}>min/km</span>
        </div>
        <div className={styles.details__heartbeat}>
          <div className={styles.details__title}>Hjärtrytm</div>
          {heartBeatPerMinute} <span className={styles.details__unit}>bpm</span>
        </div>
      </div>
    </div>
  )
})

export default AppUI
