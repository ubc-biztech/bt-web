import React from 'react'
import ReactMarkdown from 'markdown-to-jsx'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

const options = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'h5'
      }
    },
    h2: { component: Typography, props: { gutterBottom: true, variant: 'h6' } },
    h3: { component: Typography, props: { gutterBottom: true, variant: 'subtitle1' } },
    h4: {
      component: Typography,
      props: { gutterBottom: true, variant: 'caption', paragraph: true }
    },
    p: { component: Typography },
    a: { component: Link },
    li: {
      // eslint-disable-next-line
      component: ({ classes, ...props }) => (
        <li>
          <Typography component='span' {...props} />
        </li>
      )
    }
  }
}

const Markdown = (props) => {
  return (
    <ReactMarkdown options={options} {...props}>
      {props.children || ''}
    </ReactMarkdown>
  )
}

export default Markdown
