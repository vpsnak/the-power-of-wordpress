import React from 'react'
import styled from '@emotion/styled'
import axios from 'axios'
import {Deck, Heading, Slide, Text} from 'spectacle'
import createTheme from 'spectacle/lib/themes/default'

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
    fontSize: `1.5rem`
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
            username: 'vpsnak',
            password: 'Vpsnak1453753595'
        }, {
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
            <Deck
                transition={['zoom', 'slide']}
                transitionDuration={500}
                theme={customTheme}
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
                            <MainTitle dangerouslySetInnerHTML={{__html: slide.title.rendered}}/>
                            <WpContent dangerouslySetInnerHTML={{__html: slide.content.rendered}}/>
                            {!fillderSlides.includes(key) &&
                            <SpecialTitle>{slide.acf.special_title}</SpecialTitle>}
                            {!fillderSlides.includes(key) && <CreditText>Evangelos Pallis</CreditText>}
                        </StyledSlide>
                    )
                })}
            </Deck>
        )
    }
}

export default App
