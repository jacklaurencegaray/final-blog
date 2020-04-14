import React from 'react'
import { css } from '@emotion/core'

export default function AboutAuthor({ author, twitterHandle }) {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: 70px 1fr;
        align-items: center;
      `}
    >
      <img
        css={css`
          width: 48px;
          height: 48px;
          border-radius: 200%;
          margin: 0;
        `}
        src={author.photo}
        alt={'Author'}
      />
      <div>
        <p
          css={css`
            margin-bottom: 6px;
          `}
        >
          <a
            href={`https://twitter.com/${twitterHandle}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h4
              css={css`
                margin: 0;
                font-size: 18px;
              `}
            >
              {author.name}
            </h4>
          </a>
        </p>
        <p
          css={css`
            font-size: 15px;
            margin-bottom: 0;
          `}
        >
          {author.minibio}
        </p>
      </div>
    </div>
  )
}
