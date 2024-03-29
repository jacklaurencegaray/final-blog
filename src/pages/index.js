import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { useTheme } from 'components/Theming'
import Container from 'components/Container'
import AboutAuthor from 'components/AboutAuthor'
import { rhythm } from '../lib/typography'

const Description = styled.p`
  margin-bottom: 10px;
  display: inline-block;
  line-height: 2;
`

export default function Index({ data: { site, allMdx } }) {
  const theme = useTheme()
  return (
    <Layout site={site}>
      <Container
        css={css`
          padding-bottom: 0;
        `}
      >
        <div
          css={css`
            margin-bottom: 80px;
          `}
        >
          <AboutAuthor
            author={site.siteMetadata.author}
            twitterHandle={site.siteMetadata.twitterHandle}
          />
        </div>
        {allMdx.edges.map(({ node: post }) => (
          <div
            key={post.id}
            css={css`
              margin-bottom: 60px;
            `}
          >
            <h3
              css={css({
                marginBottom: rhythm(0.3),
                transition: 'all 150ms ease',
                ':hover': {
                  color: theme.colors.primary,
                },
              })}
            >
              <Link
                to={post.frontmatter.slug}
                aria-label={`View ${post.frontmatter.title}`}
              >
                {post.frontmatter.title}
              </Link>
            </h3>
            <p
              css={css`
                font-size: 14px;
                margin-bottom: 0.8em;
                margin-top: 0.8em;
                line-height: 2;
              `}
            >
              {post.frontmatter.date} &nbsp;&nbsp; {post.timeToRead * 2}-minute
              read
            </p>
            <Description
              css={css`
                font-size: 16px;
              `}
            >
              {post.excerpt}{' '}
            </Description>
          </div>
        ))}
        {allMdx?.edges?.length > 10 && (
          <Link to="/blog" aria-label="Visit blog page">
            View all articles
          </Link>
        )}
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      ...site
      siteMetadata {
        title
        author {
          name
          minibio
          photo
        }
        twitterHandle
      }
    }
    allMdx(
      limit: 5
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { ne: false } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 190)
          id
          timeToRead
          fields {
            title
            slug
            date
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
            banner {
              childImageSharp {
                sizes(maxWidth: 720) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
            slug
            keywords
          }
        }
      }
    }
  }
`
