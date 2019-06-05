import React from 'react'
import styled from '@emotion/styled'
import axios from 'axios'
import Particles from 'react-particles-js'
import {Deck, Heading, Slide, Text} from 'spectacle'
import createTheme from 'spectacle/lib/themes/default'
import {FaGithub, FaGlobe, FaLinkedin} from 'react-icons/fa'

const theme = {
    primary: `#127baa`,
    light: `#179ad4`,
    dark: `#0e6288`,
    accent: `#39329c`,
    text: `#d9e3ec`
}

const CreditText = styled.span({
    color: theme.dark,
    position: `absolute`,
    left: `.5em`,
    bottom: `.5em`,
    fontSize: `1.5rem`,
    display: `flex`,
    alignItems: `center`
})

const SpecialTitle = styled.div({
    color: theme.dark,
    position: `absolute`,
    right: `.5em`,
    top: `.5em`,
    fontWeight: `700`,
    fontSize: `2rem`
})

const MainTitle = styled.h1({
    color: '#dee8f1',
    fontWeight: `600`,
    fontSize: `3rem`,
    marginBottom: `3rem`
})

const WpContent = styled.div({
    fontSize: `2rem`,
    'ul': {
        listStyle: `none`,
        'li': {
            textAlign: `left`,
            marginBottom: `1rem`,
            '&:before': {
                content: '"-"',
                display: `inline-block`,
                marginRight: `1rem`
            }
        }
    },
    'img': {
        objectFit: `contain`,
        width: `100%`,
        maxHeight: `55vh`
    },
    'p': {
        marginBottom: `2rem`
    }
})

const StyledSlide = styled(Slide)({
    textAlign: `left`
})


const ParticlesBackground = () => {
    return (
        <Particles
            style={{
                position: `fixed`,
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                zIndex: 0
            }}
            params={{
                'particles': {
                    'number': {
                        'value': 80,
                        'density': {
                            'enable': true,
                            'value_area': 700
                        }
                    },
                    'color': {
                        'value': '#e2e2e2'
                    },
                    'shape': {
                        'type': 'circle',
                        'stroke': {
                            'width': 0,
                            'color': '#000000'
                        },
                        'polygon': {
                            'nb_sides': 5
                        },
                        'image': {
                            'src': 'img/github.svg',
                            'width': 100,
                            'height': 100
                        }
                    },
                    'opacity': {
                        'value': 0.5,
                        'random': false,
                        'anim': {
                            'enable': false,
                            'speed': 1,
                            'opacity_min': 0.1,
                            'sync': false
                        }
                    },
                    'size': {
                        'value': 4,
                        'random': true,
                        'anim': {
                            'enable': false,
                            'speed': 40,
                            'size_min': 0.1,
                            'sync': false
                        }
                    },
                    'line_linked': {
                        'enable': true,
                        'distance': 150,
                        'color': '#cccccc',
                        'opacity': 0.4,
                        'width': 1
                    },
                    'move': {
                        'enable': true,
                        'speed': 1,
                        'direction': 'none',
                        'random': false,
                        'straight': false,
                        'out_mode': 'out',
                        'bounce': false,
                        'attract': {
                            'enable': false,
                            'rotateX': 600,
                            'rotateY': 1200
                        }
                    }
                },
                'interactivity': {
                    'detect_on': 'window',
                    'events': {
                        'onhover': {
                            'enable': false,
                            'mode': 'repulse'
                        },
                        'onclick': {
                            'enable': false,
                            'mode': 'push'
                        },
                        'resize': true
                    },
                    'modes': {
                        'grab': {
                            'distance': 400,
                            'line_linked': {
                                'opacity': 1
                            }
                        },
                        'bubble': {
                            'distance': 400,
                            'size': 40,
                            'duration': 2,
                            'opacity': 8,
                            'speed': 3
                        },
                        'repulse': {
                            'distance': 150,
                            'duration': 0.4
                        },
                        'push': {
                            'particles_nb': 4
                        },
                        'remove': {
                            'particles_nb': 2
                        }
                    }
                },
                'retina_detect': true
            }}/>
    )
}

const customTheme = createTheme(
    {
        primary: theme.primary,
        secondary: theme.text,
        tertiary: theme.accent,
        quaternary: theme.dark
    },
    {
        primary: {
            name: 'Open Sans',
            googleFont: true,
            styles: ['400', '600', '700']
        },
        secondary: 'Helvetica'
    }
)

class App extends React.Component {
    state = {
        slides: []
    }

    componentDidMount() {
        axios.get('https://vpsnak.com/wp-json/wp/v2/slides?presentations=5&orderby=menu_order&order=asc', {
            validateStatus: false
        })
            .then(res => {
                console.log(res.data);
                this.setState({slides: res.data})
            })
    }

    render() {
        const {slides} = this.state

        const presentationSlides = slides

        const fillderSlides = [presentationSlides.length]

        return (
            <>
                <Deck
                    transition={['zoom', 'slide']}
                    transitionDuration={500}
                    theme={customTheme}
                    globalStyles={{
                        '.spectacle-deck': {
                            zIndex: 1
                        }
                    }}
                >
                    <Slide transition={['fade']} bgColor="primary">
                        <Heading fit caps textColor="secondary">
                            The Power Of Wordpress
                        </Heading>
                        <Text margin="10px 0 0" fit bold textColor="quaternary">
                            Μία ομιλία για τις δυνατότητες του wordpress
                        </Text>
                    </Slide>
                    {presentationSlides.length > 0 && presentationSlides.map((item, key) => {
                        const slide = item
                        return (
                            <StyledSlide key={key} transition={['fade']} bgColor="primary">
                                {/*<ParticlesBackground/>*/}
                                <MainTitle dangerouslySetInnerHTML={{__html: slide.title.rendered}}/>
                                <WpContent dangerouslySetInnerHTML={{__html: slide.content.rendered}}/>
                                {!fillderSlides.includes(key) && slide.acf && slide.acf.special_title &&
                                <SpecialTitle>{slide.acf.special_title}</SpecialTitle>}
                                {!fillderSlides.includes(key) && <CreditText>
                                    <FaGithub style={{marginRight: `10px`}}/> /vpsnak
                                    <FaGlobe style={{marginLeft: `10px`, marginRight: `10px`}}/> epallis.gr
                                    <FaLinkedin style={{marginLeft: `10px`, marginRight: `10px`}}/> evangelos-pallis
                                </CreditText>}
                            </StyledSlide>
                        )
                    })}
                </Deck>
            </>
        )
    }
}

export default App