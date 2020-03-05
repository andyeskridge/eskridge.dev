import Header from '../components/header'
import ExtLink from '../components/ext-link'

import GitHub from '../components/svgs/github'
import Twitter from '../components/svgs/twitter'
import Envelope from '../components/svgs/envelope'
import LinkedIn from '../components/svgs/linkedin'

const contacts = [
  {
    Comp: Twitter,
    alt: 'twitter icon',
    link: 'https://twitter.com/andyeskridge',
  },
  {
    Comp: GitHub,
    alt: 'github icon',
    link: 'https://github.com/andyeskridge',
  },
  {
    Comp: LinkedIn,
    alt: 'linkedin icon',
    link: 'https://www.linkedin.com/in/andyeskridge/',
  },
  {
    Comp: Envelope,
    alt: 'envelope icon',
    link: 'mailto:andy@eskridge.dev',
  },
]

export default () => (
  <>
    <Header titlePre="Contact" />
    <div>
      <h1 className="text-4xl font-extrabold tracking-tighter text-center">
        Contact
      </h1>

      <div className="text-center text-lg">
        Andy Eskridge - Director of Software Development @{' '}
        <ExtLink href="https://cenergistic.com">Cenergistic</ExtLink>
      </div>

      <div className="text-center block mx-auto my-4">
        {contacts.map(({ Comp, link, alt }) => {
          return (
            <ExtLink
              className="w-4 h-4 inline-block mx-12 fill-current"
              key={link}
              href={link}
              aria-label={alt}
            >
              <Comp height={32} />
            </ExtLink>
          )
        })}
      </div>
    </div>
  </>
)
