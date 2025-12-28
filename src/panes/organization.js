/**
 * Schema.org Organization Pane
 * Beautiful rendering of schema:Organization
 */

(function() {
'use strict';

const SCHEMA = $rdf.Namespace('http://schema.org/')

const organizationPane = {
  name: 'schemaOrganization',

  icon: $rdf.sym('https://solid-lite.github.io/schemapanes/icons/organization.svg'),

  label: function(subject, context) {
    const store = context.session.store
    const dominated = context.dom.querySelector('.schema-organization-pane')
    if (dominated) return null

    const types = store.findTypeURIs(subject)
    if (types[SCHEMA('Organization').uri] || types[SCHEMA('Corporation').uri] || types[SCHEMA('LocalBusiness').uri]) {
      return 'Organization'
    }
    return null
  },

  render: function(subject, context) {
    const store = context.session.store
    const dom = context.dom

    const div = dom.createElement('div')
    div.className = 'schema-organization-pane'
    div.style.cssText = 'font-family: system-ui, sans-serif; padding: 20px; max-width: 600px;'

    // Get properties
    const name = store.anyValue(subject, SCHEMA('name'))
    const description = store.anyValue(subject, SCHEMA('description'))
    const logo = store.any(subject, SCHEMA('logo'))
    const url = store.any(subject, SCHEMA('url'))
    const foundingDate = store.anyValue(subject, SCHEMA('foundingDate'))
    const founder = store.any(subject, SCHEMA('founder'))
    const members = store.each(subject, SCHEMA('member'))

    // Build card
    const card = dom.createElement('div')
    card.style.cssText = 'background: white; border-radius: 12px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);'

    // Header with logo
    const header = dom.createElement('div')
    header.style.cssText = 'display: flex; gap: 20px; align-items: center; margin-bottom: 20px;'

    if (logo) {
      const img = dom.createElement('img')
      img.src = logo.uri || logo.value
      img.style.cssText = 'width: 80px; height: 80px; object-fit: contain; border-radius: 8px;'
      header.appendChild(img)
    }

    const headerInfo = dom.createElement('div')

    if (name) {
      const h2 = dom.createElement('h2')
      h2.textContent = name
      h2.style.cssText = 'margin: 0 0 4px 0; color: #1e293b;'
      headerInfo.appendChild(h2)
    }

    if (foundingDate) {
      const p = dom.createElement('p')
      p.textContent = 'Founded ' + foundingDate
      p.style.cssText = 'margin: 0; color: #94a3b8; font-size: 0.9em;'
      headerInfo.appendChild(p)
    }

    header.appendChild(headerInfo)
    card.appendChild(header)

    if (description) {
      const p = dom.createElement('p')
      p.textContent = description
      p.style.cssText = 'margin: 0 0 20px 0; color: #64748b; line-height: 1.6;'
      card.appendChild(p)
    }

    // Founder
    if (founder) {
      const founderName = store.anyValue(founder, SCHEMA('name'))
      if (founderName) {
        const founderDiv = dom.createElement('div')
        founderDiv.style.cssText = 'display: flex; align-items: center; gap: 8px; margin-bottom: 16px; padding: 12px; background: #f8fafc; border-radius: 8px;'

        const label = dom.createElement('span')
        label.textContent = 'Founder:'
        label.style.cssText = 'color: #94a3b8; font-size: 0.9em;'
        founderDiv.appendChild(label)

        const founderLink = dom.createElement('span')
        founderLink.textContent = founderName
        founderLink.style.cssText = 'color: #1e293b; font-weight: 500;'
        founderDiv.appendChild(founderLink)

        card.appendChild(founderDiv)
      }
    }

    // Members
    if (members.length > 0) {
      const membersSection = dom.createElement('div')
      membersSection.style.cssText = 'margin-top: 20px;'

      const h3 = dom.createElement('h3')
      h3.textContent = 'Team'
      h3.style.cssText = 'margin: 0 0 12px 0; color: #1e293b; font-size: 1em;'
      membersSection.appendChild(h3)

      const membersList = dom.createElement('div')
      membersList.style.cssText = 'display: flex; flex-direction: column; gap: 8px;'

      members.forEach(member => {
        const memberName = store.anyValue(member, SCHEMA('name'))
        const memberTitle = store.anyValue(member, SCHEMA('jobTitle'))

        if (memberName) {
          const memberCard = dom.createElement('div')
          memberCard.style.cssText = 'display: flex; align-items: center; gap: 12px; padding: 8px 12px; background: #f8fafc; border-radius: 6px;'

          const avatar = dom.createElement('div')
          avatar.textContent = memberName.charAt(0).toUpperCase()
          avatar.style.cssText = 'width: 32px; height: 32px; background: #e0e7ff; color: #4f46e5; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.9em;'
          memberCard.appendChild(avatar)

          const memberInfo = dom.createElement('div')

          const nameSpan = dom.createElement('div')
          nameSpan.textContent = memberName
          nameSpan.style.cssText = 'color: #1e293b; font-weight: 500;'
          memberInfo.appendChild(nameSpan)

          if (memberTitle) {
            const titleSpan = dom.createElement('div')
            titleSpan.textContent = memberTitle
            titleSpan.style.cssText = 'color: #64748b; font-size: 0.85em;'
            memberInfo.appendChild(titleSpan)
          }

          memberCard.appendChild(memberInfo)
          membersList.appendChild(memberCard)
        }
      })

      membersSection.appendChild(membersList)
      card.appendChild(membersSection)
    }

    // Website link
    if (url) {
      const link = dom.createElement('a')
      link.href = url.uri || url.value
      link.textContent = 'Visit Website →'
      link.style.cssText = 'display: inline-block; margin-top: 20px; color: #2563eb; text-decoration: none; font-weight: 500;'
      card.appendChild(link)
    }

    div.appendChild(card)

    return div
  }
}

// Register with panes
if (typeof panes !== 'undefined' && panes.register) {
  panes.register(organizationPane)
}

// Export
if (typeof window !== 'undefined') {
  window.SchemaOrganizationPane = organizationPane
}

})();
