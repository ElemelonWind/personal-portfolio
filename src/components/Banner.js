import React from 'react'
import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import data from '../assets/json/chunk-text.json'
import { ArrowRightCircle } from 'react-bootstrap-icons'
import headerImg from '../assets/img/header-img.png'
import '../assets/css/Banner.css'

const Banner = () => {
    const banner_text = data.banner
    
    const [loopNum, setLoopNum] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)
    const toRotate = ["full-stack developer", "software engineer", "data nerd"]
    const [text, setText] = useState('')
    const [delta, setDelta] = useState(100)
    const period = 2000

    useEffect(() => {
        let ticker = setInterval(() => {
            tick()
        }, delta)

        return () => {
            clearInterval(ticker)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text])

    const tick = () => {
        console.log('tick')
        let i = loopNum % toRotate.length
        let fullText = toRotate[i]

        let newText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1)

        if (!isDeleting && newText === fullText) {
            setDelta(period)
            setIsDeleting(true)
        } else if (isDeleting && newText === '') {
            setIsDeleting(false)
            setLoopNum(loopNum + 1)
            setDelta(100)
        } else if (isDeleting) {
            setDelta(50)
        }

        setText(newText)
    }

    return (        
        <section className="banner" id="home">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} xl={7} className="column">
                        <h1>{`I'm Cindy, a `}
                            <span className="wrap">
                                {text}
                            </span>
                        </h1>
                        <p>{banner_text}</p>
                        <div className="button-container">
                            <a href="https://github.com/ElemelonWind" target="_blank" rel="noreferrer">Stalk my GitHub <ArrowRightCircle size={25}/></a>
                        </div>
                    </Col>
                    <Col xs={12} md={6} xl={5} className="img-col">
                        <img src={headerImg} alt="header img" />
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Banner