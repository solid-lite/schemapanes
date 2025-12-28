/**
 * Schema.org Person Pane
 * Beautiful rendering of schema:Person
 */

(function() {
'use strict';

const SCHEMA = $rdf.Namespace('http://schema.org/')

const personPane = {
  name: 'schemaPerson',

  icon: $rdf.sym('https://solid-lite.github.io/schemapanes/icons/person.svg'),

  // Return label if this pane can render the subject
  label: function(subject, context) {
    const store = context.session.store
    const dominated = context.dom.querySelector('.schema-person-pane')
    if (dominated) return null

    // Check if subject is a schema:Person
    const types = store.findTypeURIs(subject)
    if (types[SCHEMA('Person').uri]) {
      return 'Person'
    }
    return null
  },

  // Render the pane
  render: function(subject, context) {
    const store = context.session.store
    const dom = context.dom

    const div = dom.createElement('div')
    div.className = 'schema-person-pane'
    div.style.cssText = 'font-family: system-ui, sans-serif; padding: 20px; max-width: 600px;'

    // Get properties
    const name = store.anyValue(subject, SCHEMA('name'))
    const description = store.anyValue(subject, SCHEMA('description'))
    const image = store.any(subject, SCHEMA('image'))
    const jobTitle = store.anyValue(subject, SCHEMA('jobTitle'))
    const url = store.any(subject, SCHEMA('url'))
    const birthDate = store.anyValue(subject, SCHEMA('birthDate'))

    // Build card
    const card = dom.createElement('div')
    card.style.cssText = 'display: flex; gap: 20px; align-items: flex-start; background: white; border-radius: 12px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);'

    // Image
    if (image) {
      const img = dom.createElement('img')
      img.src = image.uri || image.value
      img.style.cssText = 'width: 120px; height: 120px; border-radius: 50%; object-fit: cover;'
      card.appendChild(img)
    }

    // Info
    const info = dom.createElement('div')

    if (name) {
      const h2 = dom.createElement('h2')
      h2.textContent = name
      h2.style.cssText = 'margin: 0 0 8px 0; color: #1e293b;'
      info.appendChild(h2)
    }

    if (jobTitle) {
      const p = dom.createElement('p')
      p.textContent = jobTitle
      p.style.cssText = 'margin: 0 0 8px 0; color: #7c3aed; font-weight: 500;'
      info.appendChild(p)
    }

    if (description) {
      const p = dom.createElement('p')
      p.textContent = description
      p.style.cssText = 'margin: 0 0 8px 0; color: #64748b;'
      info.appendChild(p)
    }

    if (birthDate) {
      const p = dom.createElement('p')
      p.textContent = 'Born: ' + birthDate
      p.style.cssText = 'margin: 0 0 8px 0; color: #94a3b8; font-size: 0.9em;'
      info.appendChild(p)
    }

    if (url) {
      const a = dom.createElement('a')
      a.href = url.uri || url.value
      a.textContent = 'Website'
      a.style.cssText = 'color: #2563eb;'
      info.appendChild(a)
    }

    card.appendChild(info)
    div.appendChild(card)

    return div
  }
}

// Register with panes
if (typeof panes !== 'undefined' && panes.register) {
  panes.register(personPane)
}

// Export
if (typeof window !== 'undefined') {
  window.SchemaPersonPane = personPane
}

})();
