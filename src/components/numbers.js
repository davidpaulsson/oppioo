import React, { useEffect, useState } from "react"
import Dot from "../images/numbers/dot.inline.svg"
import Eight from "../images/numbers/eight.inline.svg"
import Five from "../images/numbers/five.inline.svg"
import Four from "../images/numbers/four.inline.svg"
import Nine from "../images/numbers/nine.inline.svg"
import One from "../images/numbers/one.inline.svg"
import Seven from "../images/numbers/seven.inline.svg"
import Six from "../images/numbers/six.inline.svg"
import Three from "../images/numbers/three.inline.svg"
import Two from "../images/numbers/two.inline.svg"
import Zero from "../images/numbers/zero.inline.svg"
import styles from "./numbers.module.scss"

const Numbers = ({ distanceInKilometers, lang }) => {
  const [randomBinary, setRandomBinary] = useState(0)
  const [randomDecimal, setRandomDecimal] = useState(0)
  const [binary, setBinary] = useState(0)
  const [decimal, setDecimal] = useState(0)

  useEffect(() => {
    const dist = (distanceInKilometers + "").split(".")
    setRandomBinary(parseInt(dist[0]))
    setRandomDecimal(parseInt(dist[1]))
  }, [distanceInKilometers])

  useEffect(() => {
    setTimeout(() => {
      binary < randomBinary && setBinary(binary + 1)
      decimal < randomDecimal && setDecimal(decimal + 1)
    }, 50)
  }, [binary, randomBinary, decimal, randomDecimal])

  const numbers = {
    0: <Zero />,
    1: <One />,
    2: <Two />,
    3: <Three />,
    4: <Four />,
    5: <Five />,
    6: <Six />,
    7: <Seven />,
    8: <Eight />,
    9: <Nine />,
  }

  return (
    <>
      <div className={styles.text}>
        <div className={styles.text__distance}>
          {lang === "sv" && "Distans"}
          {lang === "en" && "Distance"}
        </div>
        <div>{distanceInKilometers} kilometer</div>
      </div>
      <div className={styles.numbers}>
        {numbers[binary]}
        <Dot className={styles.dot} />
        {numbers[decimal]}
      </div>
    </>
  )
}

export default Numbers
