import sample from "lodash.sample"
import React, { useEffect, useState, forwardRef } from "react"
import appdata from "../fixtures/appdata.json"
import styles from "./appui.module.scss"
import Numbers from "./numbers"

const AppUI = forwardRef(({ lang }, ref) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    setData(sample(appdata))
  }, [])

  if (!data) {
    return null
  }

  const {
    distanceInKilometers,
    timeInMinutes,
    minutesPerKilometer,
    heartBeatPerMinute,
  } = data

  return (
    <div ref={ref}>
      <div className={styles.title}>
        {lang === "sv" && "Dagens löprunda!"}
        {lang === "en" && "Today's running round"}
      </div>
      <Numbers {...{ distanceInKilometers, lang }} />
      <div className={styles.details}>
        <div className={styles.details__time}>
          <div className={styles.details__title}>
            {lang === "sv" && "Tid"}
            {lang === "en" && "Time"}
          </div>
          {timeInMinutes} <span className={styles.details__unit}>min</span>
        </div>
        <div className={styles.details__speed}>
          <div className={styles.details__title}>
            {lang === "sv" && "Hastighet"}
            {lang === "en" && "Speed"}
          </div>
          {minutesPerKilometer}{" "}
          <span className={styles.details__unit}>min/km</span>
        </div>
        <div className={styles.details__heartbeat}>
          <div className={styles.details__title}>
            {lang === "sv" && "Hjärtrytm"}
            {lang === "en" && (
              <span dangerouslySetInnerHTML={{ __html: "Heart&nbsp;rhythm" }} />
            )}
          </div>
          {heartBeatPerMinute} <span className={styles.details__unit}>bpm</span>
        </div>
      </div>
    </div>
  )
})

export default AppUI
