import isEqual from 'react-fast-compare'

export default (routeA, routeB) => routeA.key === routeB.key && isEqual(routeA.params || {}, routeB.params || {})