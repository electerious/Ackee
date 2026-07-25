import PropTypes from 'prop-types'
import { createElement as h } from 'react'

import enhanceUrl from '../../enhancers/enhanceUrl.js'
import sumByProperty from '../../utils/sumByProperty.js'

const Row = (props) => {
  const hasUrl = props.url != null

  const rootType = hasUrl === true ? 'a' : 'div'
  const rootProps = hasUrl === true ? { href: enhanceUrl(props.url).href, target: '_blank', rel: 'noopener' } : {}

  return h(
    rootType,
    {
      className: 'flexList__row',
      ...rootProps,
    },
    h(
      'div',
      {
        className:
          'flexList__column flexList__column--text-adjustment flexList__column--fixed-width flexList__column--spacing-left flexList__column--spacing-right',
        style: { '--width': `${props.counterWidth}px` },
      },
      h('div', { className: 'flexList__bar flexList__bar--counter', style: { '--width': `${props.barWidth}%` } }),
      h('span', { className: 'color-primary' }, `${props.count}`),
    ),
    h(
      'div',
      { className: 'flexList__column flexList__column--text-adjustment' },
      h('span', { className: 'flexList__truncated' }, props.text),
    ),
  )
}

const PresentationCounterList = (props) => {
  const totalCount = props.items.reduce(sumByProperty('count'), 0)
  const proportionalWidth = ({ count }) => (count / totalCount) * 100

  const counterWidth = props.items.reduce((maxWidth, item) => {
    const formattedCount = props.formatter(item.count)
    const formattedLength = String(formattedCount).length

    const averageCharacterWidth = 9
    const formattedWidth = formattedLength * averageCharacterWidth

    if (formattedWidth > maxWidth) return formattedWidth
    return maxWidth
  }, 0)

  return h(
    'div',
    { className: 'flexList' },
    h(
      'div',
      { className: 'flexList__inner' },
      props.items.map((item, index) =>
        h(Row, {
          key: item.text + index,
          barWidth: proportionalWidth(item),
          counterWidth,
          count: props.formatter(item.count),
          url: item.url,
          text: item.text,
        }),
      ),
    ),
  )
}

PresentationCounterList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.object,
      text: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    }),
  ).isRequired,
  formatter: PropTypes.func.isRequired,
}

export default PresentationCounterList
