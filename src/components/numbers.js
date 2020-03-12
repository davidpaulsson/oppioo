import React, { useState, useEffect } from "react"

import Zero from "../images/numbers/zero.inline.svg"
import One from "../images/numbers/one.inline.svg"
import Two from "../images/numbers/two.inline.svg"
import Three from "../images/numbers/three.inline.svg"
import Four from "../images/numbers/four.inline.svg"
import Five from "../images/numbers/five.inline.svg"
import Six from "../images/numbers/six.inline.svg"
import Seven from "../images/numbers/seven.inline.svg"
import Eight from "../images/numbers/eight.inline.svg"
import Nine from "../images/numbers/nine.inline.svg"
import Dot from "../images/numbers/dot.inline.svg"
import styles from "./numbers.module.scss"

const randomNumber = () => Math.floor(Math.random() * 10)
const randomBinary = randomNumber()
const randomDecimal = randomNumber()

const Numbers = () => {
  const [binary, setBinary] = useState(0)
  const [decimal, setDecimal] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      if (binary < randomBinary) {
        setBinary(binary + 1)
      }
      if (decimal < randomDecimal) {
        setDecimal(decimal + 1)
      }
    }, 50)
  }, [binary, decimal])

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
    <div className={styles.numbers}>
      {numbers[binary]}
      <Dot className={styles.dot} />
      {numbers[decimal]}
    </div>
  )
}

export default Numbers
