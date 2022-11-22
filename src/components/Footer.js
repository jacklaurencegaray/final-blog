import React from 'react'
import { css } from '@emotion/core'
import { bpMaxSM } from '../lib/breakpoints'
import { Twitter, GitHub } from './Social'
import Container from './Container'
import { Link } from 'gatsby'
import { useTheme } from './Theming'

const Footer = ({ author, noSubscribeForm }) => {
  const theme = useTheme()

  return (
    <footer>
      <Container
        css={css`
          padding-top: 0;
          ${bpMaxSM} {
            padding-top: 0;
          }
        `}
      >
        {!noSubscribeForm && (
          <div>
            {/* <SubscribeForm /> */}
            <br />
            <br />
          </div>
        )}
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
          `}
        >
          <div
            css={css`
              font-size: 90%;
              opacity: 0.7;
            `}
          >
            {author && `${author} \u00A9 ${new Date().getFullYear()}`}
          </div>
          <div>
            <Twitter />
            <GitHub />
            <Link
              css={css`
                margin-left: 10px;
                color: ${theme.colors.text};
                :hover {
                  color: ${theme.colors.primary};
                }
              `}
              rel="me"
              href="https://mstdn.social/@lawrencetecho"
            >
              <svg
                width="21"
                height="23"
                viewBox="0 0 21 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_106_2)">
                  <path
                    d="M20.9998 8.04551C20.9998 3.67911 17.7981 2.39883 17.7981 2.39883C14.6566 1.10957 6.31289 1.12305 3.20159 2.39883C3.20159 2.39883 -0.000177082 3.67911 -0.000177082 8.04551C-0.000177082 13.243 -0.331915 19.6982 5.30763 21.0324C7.34329 21.5131 9.09245 21.6164 10.4998 21.5445C13.0532 21.4188 14.4857 20.7314 14.4857 20.7314L14.4003 19.0738C14.4003 19.0738 12.5757 19.5859 10.525 19.5275C8.49432 19.4647 6.3531 19.3299 6.02136 17.1018C5.99121 16.9041 5.97613 16.6975 5.97613 16.4773C10.2787 17.4162 13.9479 16.8861 14.9582 16.7783C17.7779 16.4773 20.2358 14.9231 20.5475 13.5035C21.04 11.2664 20.9998 8.04551 20.9998 8.04551V8.04551ZM17.2251 13.6697H14.8828V8.53965C14.8828 6.30704 11.6659 6.22168 11.6659 8.84961V11.6572H9.33874V8.84961C9.33874 6.22168 6.12189 6.30704 6.12189 8.53965V13.6697H3.7746C3.7746 8.18477 3.51323 7.02579 4.69944 5.8084C6.00126 4.51016 8.71045 4.42481 9.91677 6.08243L10.4998 6.9584L11.0829 6.08243C12.2942 4.41582 15.0084 4.51914 16.3002 5.8084C17.4914 7.03477 17.2251 8.18926 17.2251 13.6697V13.6697Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_106_2">
                    <rect width="21" height="23" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
