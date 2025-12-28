/**
 * Schema.org Event Pane
 * Beautiful rendering of schema:Event
 */

(function() {
'use strict';

const SCHEMA = $rdf.Namespace('http://schema.org/')

const eventPane = {
  name: 'schemaEvent',

  icon: $rdf.sym('https://solid-lite.github.io/schemapanes/icons/event.svg'),

  label: function(subject, context) {
    const store = context.session.store
    const dominated = context.dom.querySelector('.schema-event-pane')
    if (dominated) return null

    const types = store.findTypeURIs(subject)
    if (types[SCHEMA('Event').uri]) {
      return 'Event'
    }
    return null
  },

  render: function(subject, context) {
    const store = context.session.store
    const dom = context.dom

    const div = dom.createElement('div')
    div.className = 'schema-event-pane'
    div.style.cssText = 'font-family: system-ui, sans-serif; padding: 20px; max-width: 600px;'

    // Get properties
    const name = store.anyValue(subject, SCHEMA('name'))
    const description = store.anyValue(subject, SCHEMA('description'))
    const image = store.any(subject, SCHEMA('image'))
    const startDate = store.anyValue(subject, SCHEMA('startDate'))
    const endDate = store.anyValue(subject, SCHEMA('endDate'))
    const location = store.anyValue(subject, SCHEMA('location'))
    const eventStatus = store.anyValue(subject, SCHEMA('eventStatus'))
    const organizer = store.any(subject, SCHEMA('organizer'))
    const url = store.any(subject, SCHEMA('url'))

    // Build card
    const card = dom.createElement('div')
    card.style.cssText = 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);'

    // Image header (optional)
    if (image) {
      const imgWrapper = dom.createElement('div')
      imgWrapper.style.cssText = 'height: 150px; overflow: hidden;'
      const img = dom.createElement('img')
      img.src = image.uri || image.value
      img.style.cssText = 'width: 100%; height: 100%; object-fit: cover; opacity: 0.9;'
      imgWrapper.appendChild(img)
      card.appendChild(imgWrapper)
    }

    // Content
    const content = dom.createElement('div')
    content.style.cssText = 'padding: 24px; color: white;'

    // Status badge
    if (eventStatus) {
      const status = eventStatus.replace('Event', '')
      const badge = dom.createElement('span')
      badge.textContent = status
      badge.style.cssText = 'background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 9999px; font-size: 0.8em; text-transform: uppercase; letter-spacing: 0.5px;'
      content.appendChild(badge)
    }

    if (name) {
      const h2 = dom.createElement('h2')
      h2.textContent = name
      h2.style.cssText = 'margin: 16px 0 12px 0; font-size: 1.5em;'
      content.appendChild(h2)
    }

    if (description) {
      const p = dom.createElement('p')
      p.textContent = description
      p.style.cssText = 'margin: 0 0 20px 0; opacity: 0.9; line-height: 1.5;'
      content.appendChild(p)
    }

    // Date/time
    if (startDate) {
      const dateDiv = dom.createElement('div')
      dateDiv.style.cssText = 'display: flex; align-items: center; gap: 12px; margin-bottom: 12px;'

      const icon = dom.createElement('span')
      icon.textContent = '📅'
      icon.style.cssText = 'font-size: 1.2em;'
      dateDiv.appendChild(icon)

      const dateInfo = dom.createElement('div')
      const start = new Date(startDate)
      const dateStr = start.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      const timeStr = start.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

      const dateText = dom.createElement('div')
      dateText.textContent = dateStr
      dateText.style.cssText = 'font-weight: 500;'
      dateInfo.appendChild(dateText)

      const timeText = dom.createElement('div')
      timeText.textContent = timeStr
      if (endDate) {
        const end = new Date(endDate)
        timeText.textContent += ' - ' + end.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }
      timeText.style.cssText = 'opacity: 0.8; font-size: 0.9em;'
      dateInfo.appendChild(timeText)

      dateDiv.appendChild(dateInfo)
      content.appendChild(dateDiv)
    }

    // Location
    if (location) {
      const locDiv = dom.createElement('div')
      locDiv.style.cssText = 'display: flex; align-items: center; gap: 12px; margin-bottom: 12px;'

      const icon = dom.createElement('span')
      icon.textContent = '📍'
      icon.style.cssText = 'font-size: 1.2em;'
      locDiv.appendChild(icon)

      const locText = dom.createElement('span')
      locText.textContent = location
      locDiv.appendChild(locText)

      content.appendChild(locDiv)
    }

    // Organizer
    if (organizer) {
      const orgName = store.anyValue(organizer, SCHEMA('name'))
      if (orgName) {
        const orgDiv = dom.createElement('div')
        orgDiv.style.cssText = 'display: flex; align-items: center; gap: 12px; margin-bottom: 16px;'

        const icon = dom.createElement('span')
        icon.textContent = '🏢'
        icon.style.cssText = 'font-size: 1.2em;'
        orgDiv.appendChild(icon)

        const orgText = dom.createElement('span')
        orgText.textContent = 'Organized by ' + orgName
        orgText.style.cssText = 'opacity: 0.9;'
        orgDiv.appendChild(orgText)

        content.appendChild(orgDiv)
      }
    }

    // Join button
    if (url) {
      const btn = dom.createElement('a')
      btn.href = url.uri || url.value
      btn.textContent = 'Join Event'
      btn.style.cssText = 'display: inline-block; background: white; color: #667eea; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 8px;'
      content.appendChild(btn)
    }

    card.appendChild(content)
    div.appendChild(card)

    return div
  }
}

// Register with panes
if (typeof panes !== 'undefined' && panes.register) {
  panes.register(eventPane)
}

// Export
if (typeof window !== 'undefined') {
  window.SchemaEventPane = eventPane
}

})();
