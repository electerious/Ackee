this.fit =

	_container: null
	_elements: null
	_elementsMargin: null
	_elementsWidth: null

	_valid: ->

		if	fit._container? and
			fit._elements? and
			fit._elementsMargin? and
			fit._elementsWidth? and
			not isNaN(fit._elementsMargin) and
			not isNaN(fit._elementsWidth)

				return true

		return false

	_calculate: ->

		if fit._valid

			containerWidth		= fit._container.width()
			elementsNumber		= Math.floor containerWidth/fit._elementsWidth
			elementsNewWidth	= (containerWidth/elementsNumber)-fit._elementsMargin

			fit._elements.css('width', "#{ elementsNewWidth }px")
			return true

		return false

	init: (container, elements) ->

		fit._container	= $(container)
		fit._elements	= fit._container.children(elements)

		fit.refresh()

		$(window).on 'resize', ->
			fit._calculate()

		return true if fit._valid
		return false

	refresh: ->

		fit._container	= $(fit._container.selector)
		fit._elements	= fit._container.children(fit._elements.selector)

		fit._elementsMargin	= parseInt(fit._elements.css('margin-left')) + parseInt(fit._elements.css('margin-right'))
		fit._elementsWidth	= parseInt(fit._elements.css('min-width')) + fit._elementsMargin

		fit._calculate()

		return true if fit._valid
		return false